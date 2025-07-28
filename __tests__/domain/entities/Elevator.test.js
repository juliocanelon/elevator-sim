const Elevator = require('../../../domain/entities/Elevator');
const FloorNumber = require('../../../domain/valueobjects/FloorNumber');

describe('Elevator', () => {
  test('addDestination adds unique floors', () => {
    const e = new Elevator('E1');
    e.addDestination(3);
    expect(e.targetFloors).toHaveLength(1);
    expect(e.targetFloors[0]).toBeInstanceOf(FloorNumber);
    expect(e.targetFloors[0].value).toBe(3);
    e.addDestination(new FloorNumber(3));
    expect(e.targetFloors).toHaveLength(1);
  });

  test('move with no destinations sets Idle state', () => {
    const e = new Elevator('E1');
    e.move();
    expect(e.currentFloor.value).toBe(1);
    expect(e.state.value).toBe('Idle');
  });

  test('move up increments floor and sets MovingUp', () => {
    const e = new Elevator('E1');
    e.addDestination(3);
    e.move();
    expect(e.currentFloor.value).toBe(2);
    expect(e.state.value).toBe('MovingUp');
  });

  test('move down decrements floor and sets MovingDown', () => {
    const e = new Elevator('E1', 3);
    e.addDestination(1);
    e.move();
    expect(e.currentFloor.value).toBe(2);
    expect(e.state.value).toBe('MovingDown');
  });

  test('arriving at destination sets Loading and removes target', () => {
    const e = new Elevator('E1', 1);
    e.addDestination(1);
    e.move();
    expect(e.currentFloor.value).toBe(1);
    expect(e.state.value).toBe('Loading');
    expect(e.targetFloors).toHaveLength(0);
  });
});
