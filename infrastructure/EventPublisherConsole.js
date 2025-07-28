// infrastructure/EventPublisherConsole.js
const EventPublisher = require('../application/ports/EventPublisher');

class EventPublisherConsole extends EventPublisher {
  async publish(event) {
    throw new Error('Not implemented');
  }
}

module.exports = EventPublisherConsole;
