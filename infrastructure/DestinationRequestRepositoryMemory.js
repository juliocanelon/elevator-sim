// infrastructure/DestinationRequestRepositoryMemory.js
const DestinationRequestRepository = require('../application/ports/DestinationRequestRepository');

class DestinationRequestRepositoryMemory extends DestinationRequestRepository {
  constructor() {
    super();
    this.queue = [];
  }

  async enqueue(request) {
    this.queue.push(request);
  }

  async dequeueAll() {
    const all = [...this.queue];
    this.queue = [];
    return all;
  }
}

module.exports = DestinationRequestRepositoryMemory;
