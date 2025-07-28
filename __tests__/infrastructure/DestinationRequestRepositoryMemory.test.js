const DestinationRequestRepositoryMemory = require('../../infrastructure/DestinationRequestRepositoryMemory');
const DestinationRequestRepository = require('../../application/ports/DestinationRequestRepository');

describe('DestinationRequestRepositoryMemory', () => {
  test('extends DestinationRequestRepository', () => {
    const repo = new DestinationRequestRepositoryMemory();
    expect(repo instanceof DestinationRequestRepository).toBe(true);
  });

  test('enqueue and dequeueAll store and clear requests', async () => {
    const repo = new DestinationRequestRepositoryMemory();
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
