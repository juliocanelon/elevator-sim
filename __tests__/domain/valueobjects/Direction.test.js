const Direction = require('../../../domain/valueobjects/Direction');

describe('Direction', () => {
  test('accepts valid directions', () => {
    expect(new Direction('Up').value).toBe('Up');
    expect(new Direction('Down').value).toBe('Down');
  });

  test('throws for invalid direction', () => {
    expect(() => new Direction('Left')).toThrow(Error);
  });
});
