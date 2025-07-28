const ElevatorRepositoryHttp = require('../../infrastructure/ElevatorRepositoryHttp');
const ElevatorRepository = require('../../application/ports/ElevatorRepository');

describe('ElevatorRepositoryHttp', () => {
  test('extends ElevatorRepository', () => {
    const repo = new ElevatorRepositoryHttp();
    expect(repo instanceof ElevatorRepository).toBe(true);
  });

  test('can save and retrieve elevators', async () => {
    const repo = new ElevatorRepositoryHttp();
    const e1 = { id: 'E1' };
    const e2 = { id: 'E2' };
    await repo.save(e1);
    await repo.save(e2);
    const all = await repo.findAll();
    expect(all).toEqual([e1, e2]);
    const found = await repo.findById('E1');
    expect(found).toBe(e1);
  });
});
