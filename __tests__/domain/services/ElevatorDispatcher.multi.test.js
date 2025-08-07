const ElevatorDispatcher = require('../../../domain/services/ElevatorDispatcher');
const CallRequest = require('../../../domain/entities/CallRequest');
const DestinationRequest = require('../../../domain/entities/DestinationRequest');
const Elevator = require('../../../domain/entities/Elevator');
const ElevatorState = require('../../../domain/valueobjects/ElevatorState');

describe('ElevatorDispatcher with multiple elevators', () => {
  test('dispatches requests to nearest elevators', async () => {
    const e1 = new Elevator('A1', 1);
    const e2 = new Elevator('A2', 5);
    e1.state = new ElevatorState('Idle');
    e2.state = new ElevatorState('Idle');

    const elevatorRepo = {
      findAll: jest.fn().mockResolvedValue([e1, e2]),
      save: jest.fn()
    };

    const callRepo = {
      dequeueAll: jest.fn().mockResolvedValue([new CallRequest(4, 'Down')]),
      enqueue: jest.fn()
    };

    const destRepo = {
      dequeueAll: jest.fn().mockResolvedValue([new DestinationRequest(2)]),
      enqueue: jest.fn()
    };

    const dispatcher = new ElevatorDispatcher(elevatorRepo, callRepo, destRepo);

    await dispatcher.handleTick({ now: () => Date.now() });

    expect(e2.targetFloors[0].value).toBe(4);
    expect(e1.targetFloors[0].value).toBe(2);
    expect(elevatorRepo.save).toHaveBeenCalledWith(e1);
    expect(elevatorRepo.save).toHaveBeenCalledWith(e2);
  });

  test('prioritizes in-elevator destination over external call', async () => {
    const e1 = new Elevator('A1', 1);
    const e2 = new Elevator('A2', 5);
    e1.state = new ElevatorState('Idle');
    e2.state = new ElevatorState('Idle');

    const elevatorRepo = {
      findAll: jest.fn().mockResolvedValue([e1, e2]),
      save: jest.fn(),
    };

    const callRepo = {
      dequeueAll: jest.fn().mockResolvedValue([new CallRequest(2, 'Up')]),
      enqueue: jest.fn(),
    };

    const destRepo = {
      dequeueAll: jest.fn().mockResolvedValue([new DestinationRequest(3)]),
      enqueue: jest.fn(),
    };

    const dispatcher = new ElevatorDispatcher(elevatorRepo, callRepo, destRepo);

    await dispatcher.handleTick({ now: () => Date.now() });

    expect(e1.targetFloors[0].value).toBe(3);
    expect(e2.targetFloors[0].value).toBe(2);
    expect(elevatorRepo.save).toHaveBeenCalledWith(e1);
    expect(elevatorRepo.save).toHaveBeenCalledWith(e2);
  });
});
