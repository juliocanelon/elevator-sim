const CallRequest = require('../../../domain/entities/CallRequest');
const FloorNumber = require('../../../domain/valueobjects/FloorNumber');
const Direction = require('../../../domain/valueobjects/Direction');

describe('CallRequest', () => {
  test('constructs FloorNumber and Direction from primitives', () => {
    const req = new CallRequest(2, 'Up');
    expect(req.floor).toBeInstanceOf(FloorNumber);
    expect(req.floor.value).toBe(2);
    expect(req.direction).toBeInstanceOf(Direction);
    expect(req.direction.value).toBe('Up');
  });

  test('accepts FloorNumber and Direction instances', () => {
    const floor = new FloorNumber(3);
    const direction = new Direction('Down');
    const req = new CallRequest(floor, direction);
    expect(req.floor).toBe(floor);
    expect(req.direction).toBe(direction);
  });
});
