const FloorNumber = require('../../../domain/valueobjects/FloorNumber');

describe('FloorNumber', () => {
  test('creates a valid floor number', () => {
    for (let i = 1; i <= 5; i++) {
      const f = new FloorNumber(i);
      expect(f.value).toBe(i);
    }
  });

  test('throws for invalid values', () => {
    expect(() => new FloorNumber(0)).toThrow(Error);
    expect(() => new FloorNumber(6)).toThrow(Error);
    expect(() => new FloorNumber(1.5)).toThrow(Error);
  });
});
