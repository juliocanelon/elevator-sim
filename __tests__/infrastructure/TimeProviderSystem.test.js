const TimeProviderSystem = require('../../infrastructure/TimeProviderSystem');
const TimeProvider = require('../../application/ports/TimeProvider');

describe('TimeProviderSystem', () => {
  test('extends TimeProvider', () => {
    const tp = new TimeProviderSystem();
    expect(tp instanceof TimeProvider).toBe(true);
  });

  test('now throws Not implemented', () => {
    const tp = new TimeProviderSystem();
    expect(() => tp.now()).toThrow('Not implemented');
  });
});
