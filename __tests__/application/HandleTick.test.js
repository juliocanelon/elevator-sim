const HandleTick = require('../../application/HandleTick');
const CallRequest = require('../../domain/entities/CallRequest');
const DestinationRequest = require('../../domain/entities/DestinationRequest');
const Elevator = require('../../domain/entities/Elevator');

describe('HandleTick', () => {
  test('processes queues and moves elevators', async () => {
    const mockCallRepo = { dequeueAll: jest.fn().mockResolvedValue([new CallRequest(1, 'Up')]) };
    const mockDestRepo = { dequeueAll: jest.fn().mockResolvedValue([new DestinationRequest(4)]) };
    const elevator = new Elevator('E1');
    jest.spyOn(elevator, 'move');
    const mockElevatorRepo = {
      findAll: jest.fn().mockResolvedValue([elevator]),
      save: jest.fn()
    };
    const timeProvider = { now: jest.fn().mockReturnValue(Date.now()) };
    const dispatcher = {
      dispatchCall: jest.fn(),
      dispatchDestination: jest.fn()
    };
    const handler = new HandleTick(mockCallRepo, mockDestRepo, mockElevatorRepo, dispatcher, timeProvider);

    await handler.execute();

    expect(mockCallRepo.dequeueAll).toHaveBeenCalled();
    expect(mockDestRepo.dequeueAll).toHaveBeenCalled();
    expect(dispatcher.dispatchCall).toHaveBeenCalled();
    expect(dispatcher.dispatchDestination).toHaveBeenCalled();
    expect(elevator.move).toHaveBeenCalled();
    expect(mockElevatorRepo.save).toHaveBeenCalledWith(elevator);
  });
});