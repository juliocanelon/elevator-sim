const EventPublisherConsole = require('../../infrastructure/EventPublisherConsole');
const EventPublisher = require('../../application/ports/EventPublisher');

describe('EventPublisherConsole', () => {
  test('extends EventPublisher', () => {
    const pub = new EventPublisherConsole();
    expect(pub instanceof EventPublisher).toBe(true);
  });

  test('publish throws Not implemented', async () => {
    const pub = new EventPublisherConsole();
    await expect(pub.publish({})).rejects.toThrow('Not implemented');
  });
});
