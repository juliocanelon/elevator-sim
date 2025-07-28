const Building = require('../../../domain/entities/Building');
const Elevator = require('../../../domain/entities/Elevator');
const CallRequest = require('../../../domain/entities/CallRequest');
const DestinationRequest = require('../../../domain/entities/DestinationRequest');
const ElevatorState = require('../../../domain/valueobjects/ElevatorState');

describe('Building', () => {
  test('assigns call to closest elevator considering direction', () => {
    const e1 = new Elevator('E1', 1);
    const e2 = new Elevator('E2', 5);
    e1.state = new ElevatorState('Idle');
    e2.state = new ElevatorState('Idle');
    const building = new Building([e1, e2]);

    building.handleCall(new CallRequest(4, 'Down'));

    expect(e2.targetFloors[0].value).toBe(4);
    expect(e1.targetFloors).toHaveLength(0);
  });

  test('assigns destination to nearest elevator', () => {
    const e1 = new Elevator('E1', 1);
    const e2 = new Elevator('E2', 5);
    const building = new Building([e1, e2]);

    building.handleDestination(new DestinationRequest(2));

    expect(e1.targetFloors[0].value).toBe(2);
    expect(e2.targetFloors).toHaveLength(0);
  });
});
