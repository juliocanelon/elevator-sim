const ElevatorRepositoryHttp = require('../../infrastructure/ElevatorRepositoryHttp');
const ElevatorRepository = require('../../application/ports/ElevatorRepository');

describe('ElevatorRepositoryHttp', () => {
  test('extends ElevatorRepository', () => {
    const repo = new ElevatorRepositoryHttp();
    expect(repo instanceof ElevatorRepository).toBe(true);
  });

  test('methods throw Not implemented', async () => {
    const repo = new ElevatorRepositoryHttp();
    await expect(repo.findAll()).rejects.toThrow('Not implemented');
    await expect(repo.findById('id')).rejects.toThrow('Not implemented');
    await expect(repo.save({})).rejects.toThrow('Not implemented');
  });
});
