// infrastructure/DestinationRequestRepositoryMemory.js
const DestinationRequestRepository = require('../application/ports/DestinationRequestRepository');

class DestinationRequestRepositoryMemory extends DestinationRequestRepository {
  async enqueue(request) {
    throw new Error('Not implemented');
  }

  async dequeueAll() {
    throw new Error('Not implemented');
  }
}

module.exports = DestinationRequestRepositoryMemory;
