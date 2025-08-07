const handler = require('../../api/tick');

describe('api/tick.js', () => {
  test('responds with not implemented message', async () => {
    const json = jest.fn();
    const res = { status: jest.fn(() => ({ json })) };
    await handler({}, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ message: 'Not implemented.' });
  });
});
