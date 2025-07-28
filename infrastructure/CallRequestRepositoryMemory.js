// infrastructure/CallRequestRepositoryMemory.js
const CallRequestRepository = require('../application/ports/CallRequestRepository');

class CallRequestRepositoryMemory extends CallRequestRepository {
  async enqueue(request) {
    throw new Error('Not implemented');
  }

  async dequeueAll() {
    throw new Error('Not implemented');
  }
}

module.exports = CallRequestRepositoryMemory;
