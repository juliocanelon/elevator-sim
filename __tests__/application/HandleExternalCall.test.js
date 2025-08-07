const HandleExternalCall = require('../../application/HandleExternalCall');
const CallRequest = require('../../domain/entities/CallRequest');

describe('HandleExternalCall', () => {
  test('dispatches call through dispatcher and publishes event', async () => {
    const dispatcher = { dispatchCall: jest.fn() };
    const publisher = { publish: jest.fn() };
    const handler = new HandleExternalCall(dispatcher, publisher);
    const req = new CallRequest(3, 'Up');

    await handler.execute(req);

    expect(dispatcher.dispatchCall).toHaveBeenCalledWith(req);
    expect(publisher.publish).toHaveBeenCalledWith({ type: 'CallQueued', request: req });
  });
});
