const CallRequestRepositoryMemory = require('../../infrastructure/CallRequestRepositoryMemory');
const CallRequestRepository = require('../../application/ports/CallRequestRepository');

describe('CallRequestRepositoryMemory', () => {
  test('extends CallRequestRepository', () => {
    const repo = new CallRequestRepositoryMemory();
    expect(repo instanceof CallRequestRepository).toBe(true);
  });

  test('methods throw Not implemented', async () => {
    const repo = new CallRequestRepositoryMemory();
    await expect(repo.enqueue({})).rejects.toThrow('Not implemented');
    await expect(repo.dequeueAll()).rejects.toThrow('Not implemented');
  });
});
