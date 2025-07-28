const HandleExternalCall = require('../../application/HandleExternalCall');
const CallRequest = require('../../domain/entities/CallRequest');

describe('HandleExternalCall', () => {
  test('enqueues request and saves elevator if assigned immediately', async () => {
    const mockCallRepo = { enqueue: jest.fn() };
    const mockElevatorRepo = { save: jest.fn() };
    const handler = new HandleExternalCall(mockCallRepo, mockElevatorRepo);
    const req = new CallRequest(3, 'Up');

    await handler.execute(req);

    expect(mockCallRepo.enqueue).toHaveBeenCalledWith(req);
    expect(mockElevatorRepo.save).toHaveBeenCalled();
  });
});