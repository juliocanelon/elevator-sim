// infrastructure/EventPublisherConsole.js
const EventPublisher = require('../application/ports/EventPublisher');

class EventPublisherConsole extends EventPublisher {
  async publish(event) {
    console.log(event);
  }
}

module.exports = EventPublisherConsole;
