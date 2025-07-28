const EventPublisherConsole = require('../../infrastructure/EventPublisherConsole');
const EventPublisher = require('../../application/ports/EventPublisher');

describe('EventPublisherConsole', () => {
  test('extends EventPublisher', () => {
    const pub = new EventPublisherConsole();
    expect(pub instanceof EventPublisher).toBe(true);
  });

  test('publish logs the event', async () => {
    const pub = new EventPublisherConsole();
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const event = { type: 'TEST' };
    await pub.publish(event);
    expect(spy).toHaveBeenCalledWith(event);
    spy.mockRestore();
  });
});
