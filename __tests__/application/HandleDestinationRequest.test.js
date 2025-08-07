const HandleDestinationRequest = require('../../application/HandleDestinationRequest');
const DestinationRequest = require('../../domain/entities/DestinationRequest');

describe('HandleDestinationRequest', () => {
  test('dispatches destination through dispatcher and publishes event', async () => {
    const dispatcher = { dispatchDestination: jest.fn() };
    const publisher = { publish: jest.fn() };
    const handler = new HandleDestinationRequest(dispatcher, publisher);
    const req = new DestinationRequest(5);

    await handler.execute(req);

    expect(dispatcher.dispatchDestination).toHaveBeenCalledWith(req);
    expect(publisher.publish).toHaveBeenCalledWith({ type: 'DestinationQueued', request: req });
  });
});
