const api = require('../../api/call');
const HandleExternalCall = require('../../application/HandleExternalCall');
const CallRequest = require('../../domain/entities/CallRequest');

jest.mock('../../application/HandleExternalCall');
jest.mock('../../infrastructure/container', () => ({
  callRepo: {},
  elevatorRepo: {}
}));

function createRes() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };
}

describe('api/call', () => {
  test('parses body and delegates to HandleExternalCall', async () => {
    const exec = jest.fn();
    HandleExternalCall.mockImplementation(() => ({ execute: exec }));

    const req = { method: 'POST', body: JSON.stringify({ floor: 2, direction: 'Up' }), on: jest.fn() };
    const res = createRes();

    await api(req, res);

    expect(HandleExternalCall).toHaveBeenCalled();
    expect(exec.mock.calls[0][0]).toBeInstanceOf(CallRequest);
    expect(exec.mock.calls[0][0].floor.value).toBe(2);
    expect(exec.mock.calls[0][0].direction.value).toBe('Up');
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('returns 405 on invalid method', async () => {
    const req = { method: 'GET', on: jest.fn() };
    const res = createRes();

    await api(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
  });

  test('returns 400 when handler fails', async () => {
    const exec = jest.fn().mockRejectedValue(new Error('bad'));
    HandleExternalCall.mockImplementation(() => ({ execute: exec }));

    const req = { method: 'POST', body: JSON.stringify({ floor: 1, direction: 'Up' }), on: jest.fn() };
    const res = createRes();

    await api(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'bad' });
  });
});
