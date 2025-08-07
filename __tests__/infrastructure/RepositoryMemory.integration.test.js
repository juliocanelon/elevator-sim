const CallRequestRepositoryMemory = require('../../infrastructure/CallRequestRepositoryMemory');
const DestinationRequestRepositoryMemory = require('../../infrastructure/DestinationRequestRepositoryMemory');
const CallRequest = require('../../domain/entities/CallRequest');
const DestinationRequest = require('../../domain/entities/DestinationRequest');

describe('memory repositories', () => {
  test('store and clear independent queues', async () => {
    const callRepo = new CallRequestRepositoryMemory();
    const destRepo = new DestinationRequestRepositoryMemory();

    await callRepo.enqueue(new CallRequest(1, 'Up'));
    await destRepo.enqueue(new DestinationRequest(3));
    await callRepo.enqueue(new CallRequest(2, 'Down'));

    const calls = await callRepo.dequeueAll();
    const dests = await destRepo.dequeueAll();

    expect(calls.map(c => c.floor.value)).toEqual([1, 2]);
    expect(dests.map(d => d.floor.value)).toEqual([3]);

    expect(await callRepo.dequeueAll()).toEqual([]);
    expect(await destRepo.dequeueAll()).toEqual([]);
  });
});
