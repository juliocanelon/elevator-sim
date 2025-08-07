const api = require('../../api/tick');
const HandleTick = require('../../application/HandleTick');

jest.mock('../../application/HandleTick');
jest.mock('../../infrastructure/container', () => ({
  callRepo: {},
  destRepo: {},
  elevatorRepo: {},
  dispatcher: {},
  timeProvider: {}
}));

function createRes() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };
}

describe('api/tick', () => {
  test('delegates to HandleTick', async () => {
    const exec = jest.fn();
    HandleTick.mockImplementation(() => ({ execute: exec }));

    const req = { method: 'POST' };
    const res = createRes();

    await api(req, res);

    expect(HandleTick).toHaveBeenCalled();
    expect(exec).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('returns 405 on bad method', async () => {
    const req = { method: 'PUT' };
    const res = createRes();

    await api(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
  });

  test('supports GET method', async () => {
    const exec = jest.fn();
    HandleTick.mockImplementation(() => ({ execute: exec }));

    const req = { method: 'GET' };
    const res = createRes();

    await api(req, res);

    expect(exec).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('returns 500 when handler fails', async () => {
    const exec = jest.fn().mockRejectedValue(new Error('oops'));
    HandleTick.mockImplementation(() => ({ execute: exec }));

    const req = { method: 'POST' };
    const res = createRes();

    await api(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'oops' });
  });
});
