// infrastructure/ElevatorRepositoryHttp.js
const ElevatorRepository = require('../application/ports/ElevatorRepository');

class ElevatorRepositoryHttp extends ElevatorRepository {
  async findAll() {
    throw new Error('Not implemented');
  }

  async findById(id) {
    throw new Error('Not implemented');
  }

  async save(elevator) {
    throw new Error('Not implemented');
  }
}

module.exports = ElevatorRepositoryHttp;
