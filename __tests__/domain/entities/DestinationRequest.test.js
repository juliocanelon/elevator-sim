const DestinationRequest = require('../../../domain/entities/DestinationRequest');
const FloorNumber = require('../../../domain/valueobjects/FloorNumber');

describe('DestinationRequest', () => {
  test('constructs FloorNumber from primitive', () => {
    const req = new DestinationRequest(5);
    expect(req.floor).toBeInstanceOf(FloorNumber);
    expect(req.floor.value).toBe(5);
  });

  test('accepts FloorNumber instance', () => {
    const floor = new FloorNumber(2);
    const req = new DestinationRequest(floor);
    expect(req.floor).toBe(floor);
  });
});
