// infrastructure/ElevatorRepositoryHttp.js
const ElevatorRepository = require('../application/ports/ElevatorRepository');

class ElevatorRepositoryHttp extends ElevatorRepository {
  constructor(initialElevators = []) {
    super();
    this.elevators = new Map();
    for (const e of initialElevators) {
      this.elevators.set(e.id, e);
    }
  }

  async findAll() {
    return Array.from(this.elevators.values());
  }

  async findById(id) {
    return this.elevators.get(id);
  }

  async save(elevator) {
    this.elevators.set(elevator.id, elevator);
  }
}

module.exports = ElevatorRepositoryHttp;
