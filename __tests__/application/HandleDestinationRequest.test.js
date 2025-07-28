const HandleDestinationRequest = require('../../application/HandleDestinationRequest');
const DestinationRequest = require('../../domain/entities/DestinationRequest');

describe('HandleDestinationRequest', () => {
  test('enqueues destination and saves elevator when applicable', async () => {
    const mockDestRepo = { enqueue: jest.fn() };
    const mockElevatorRepo = { save: jest.fn() };
    const handler = new HandleDestinationRequest(mockDestRepo, mockElevatorRepo);
    const req = new DestinationRequest(5);

    await handler.execute(req);

    expect(mockDestRepo.enqueue).toHaveBeenCalledWith(req);
    expect(mockElevatorRepo.save).toHaveBeenCalled();
  });
});
