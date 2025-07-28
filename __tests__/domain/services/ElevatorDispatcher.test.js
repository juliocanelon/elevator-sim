const ElevatorDispatcher = require('../../../domain/services/ElevatorDispatcher');
const CallRequest = require('../../../domain/entities/CallRequest');
const DestinationRequest = require('../../../domain/entities/DestinationRequest');
const Elevator = require('../../../domain/entities/Elevator');

jest.mock('../../../domain/entities/Elevator');

describe('ElevatorDispatcher', () => {
  let elevatorRepo, callRepo, destRepo, dispatcher;

  beforeEach(() => {
    elevatorRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn()
    };
    callRepo = {
      enqueue: jest.fn(),
      dequeueAll: jest.fn()
    };
    destRepo = {
      enqueue: jest.fn(),
      dequeueAll: jest.fn()
    };
    dispatcher = new ElevatorDispatcher(elevatorRepo, callRepo, destRepo);
  });

  test('dispatchCall enqueues call request', async () => {
    const req = new CallRequest(2, 'Up');
    await dispatcher.dispatchCall(req);
    expect(callRepo.enqueue).toHaveBeenCalledWith(req);
  });

  test('dispatchDestination enqueues destination request', async () => {
    const req = new DestinationRequest(5);
    await dispatcher.dispatchDestination(req);
    expect(destRepo.enqueue).toHaveBeenCalledWith(req);
  });

  test('handleTick moves elevators and saves state', async () => {
    const elevator = new Elevator('E1');
    elevatorRepo.findAll.mockResolvedValue([elevator]);
    callRepo.dequeueAll.mockResolvedValue([]);
    destRepo.dequeueAll.mockResolvedValue([]);
    elevator.move = jest.fn();
    const timeProvider = { now: jest.fn().mockReturnValue(Date.now()) };

    await dispatcher.handleTick(timeProvider);

    expect(elevator.move).toHaveBeenCalled();
    expect(elevatorRepo.save).toHaveBeenCalledWith(elevator);
  });
});
