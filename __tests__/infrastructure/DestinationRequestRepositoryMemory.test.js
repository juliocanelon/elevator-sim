const DestinationRequestRepositoryMemory = require('../../infrastructure/DestinationRequestRepositoryMemory');
const DestinationRequestRepository = require('../../application/ports/DestinationRequestRepository');

describe('DestinationRequestRepositoryMemory', () => {
  test('extends DestinationRequestRepository', () => {
    const repo = new DestinationRequestRepositoryMemory();
    expect(repo instanceof DestinationRequestRepository).toBe(true);
  });

  test('methods throw Not implemented', async () => {
    const repo = new DestinationRequestRepositoryMemory();
    await expect(repo.enqueue({})).rejects.toThrow('Not implemented');
    await expect(repo.dequeueAll()).rejects.toThrow('Not implemented');
  });
});
