const CallRequestRepositoryMemory = require('../../infrastructure/CallRequestRepositoryMemory');
const CallRequestRepository = require('../../application/ports/CallRequestRepository');

describe('CallRequestRepositoryMemory', () => {
  test('extends CallRequestRepository', () => {
    const repo = new CallRequestRepositoryMemory();
    expect(repo instanceof CallRequestRepository).toBe(true);
  });

  test('enqueue and dequeueAll store and clear requests', async () => {
    const repo = new CallRequestRepositoryMemory();
    const req1 = { id: 1 };
    const req2 = { id: 2 };
    await repo.enqueue(req1);
    await repo.enqueue(req2);
    const all = await repo.dequeueAll();
    expect(all).toEqual([req1, req2]);
    const empty = await repo.dequeueAll();
    expect(empty).toEqual([]);
  });
});
