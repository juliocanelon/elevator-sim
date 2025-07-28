// infrastructure/CallRequestRepositoryMemory.js
const CallRequestRepository = require('../application/ports/CallRequestRepository');

class CallRequestRepositoryMemory extends CallRequestRepository {
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

module.exports = CallRequestRepositoryMemory;
