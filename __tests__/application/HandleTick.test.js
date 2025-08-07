const HandleTick = require('../../application/HandleTick');
const Elevator = require('../../domain/entities/Elevator');

describe('HandleTick', () => {
  test('delegates tick to dispatcher and publishes elevator updates', async () => {
    const elevator = new Elevator('A1');
    const elevatorRepo = { findAll: jest.fn().mockResolvedValue([elevator]) };
    const dispatcher = { handleTick: jest.fn(), elevatorRepo };
    const publisher = { publish: jest.fn() };
    const timeProvider = { now: jest.fn().mockReturnValue(123) };
    const handler = new HandleTick(dispatcher, publisher, timeProvider);

    await handler.execute();

    expect(dispatcher.handleTick).toHaveBeenCalledWith(timeProvider);
    expect(elevatorRepo.findAll).toHaveBeenCalled();
    expect(publisher.publish).toHaveBeenCalledWith({
      type: 'ElevatorUpdated',
      id: elevator.id,
      floor: elevator.currentFloor.value,
      state: elevator.state.value,
      targets: [],
      timestamp: 123,
    });
  });
});
