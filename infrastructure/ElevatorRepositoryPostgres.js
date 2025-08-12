const ElevatorRepository = require('../application/ports/ElevatorRepository');
const Elevator = require('../domain/entities/Elevator');
const FloorNumber = require('../domain/valueobjects/FloorNumber');
const ElevatorState = require('../domain/valueobjects/ElevatorState');
const { sql } = require('@vercel/postgres');

class ElevatorRepositoryPostgres extends ElevatorRepository {
  constructor(initialElevators = []) {
    super();
    this.initialElevators = initialElevators;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;
    await sql`CREATE TABLE IF NOT EXISTS elevators (
      id TEXT PRIMARY KEY,
      current_floor INT,
      state TEXT,
      target_floors JSON
    );`;
    const { rows } = await sql`SELECT COUNT(*) AS count FROM elevators;`;
    if (rows[0] && parseInt(rows[0].count, 10) === 0) {
      for (const e of this.initialElevators) {
        await this.save(e);
      }
    }
    this.initialized = true;
  }

  toDomain(row) {
    const elevator = new Elevator(row.id, row.current_floor);
    elevator.state = new ElevatorState(row.state);
    const targets = Array.isArray(row.target_floors) ? row.target_floors : [];
    elevator.targetFloors = targets.map(f => new FloorNumber(f));
    return elevator;
  }

  async findAll() {
    await this.init();
    const { rows } = await sql`SELECT * FROM elevators ORDER BY id;`;
    return rows.map(r => this.toDomain(r));
  }

  async findById(id) {
    await this.init();
    const { rows } = await sql`SELECT * FROM elevators WHERE id = ${id};`;
    if (rows.length === 0) return null;
    return this.toDomain(rows[0]);
  }

  async save(e) {
    await this.init();
    const currentFloor = e.currentFloor && e.currentFloor.value !== undefined ? e.currentFloor.value : e.currentFloor;
    const state = e.state && e.state.value !== undefined ? e.state.value : e.state;
    const targetFloors = (e.targetFloors || []).map(f => (f && f.value !== undefined ? f.value : f));
    await sql`
      INSERT INTO elevators (id, current_floor, state, target_floors)
      VALUES (${e.id}, ${currentFloor}, ${state}, ${JSON.stringify(targetFloors)})
      ON CONFLICT (id) DO UPDATE SET
        current_floor = EXCLUDED.current_floor,
        state = EXCLUDED.state,
        target_floors = EXCLUDED.target_floors;
    `;
  }
}

module.exports = ElevatorRepositoryPostgres;
