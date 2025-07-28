const TimeProviderSystem = require('../../infrastructure/TimeProviderSystem');
const TimeProvider = require('../../application/ports/TimeProvider');

describe('TimeProviderSystem', () => {
  test('extends TimeProvider', () => {
    const tp = new TimeProviderSystem();
    expect(tp instanceof TimeProvider).toBe(true);
  });

  test('now returns current timestamp', () => {
    const tp = new TimeProviderSystem();
    const before = Date.now();
    const value = tp.now();
    const after = Date.now();
    expect(typeof value).toBe('number');
    expect(value).toBeGreaterThanOrEqual(before);
    expect(value).toBeLessThanOrEqual(after);
  });
});
