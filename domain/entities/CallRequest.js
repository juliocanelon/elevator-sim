const FloorNumber = require('../valueobjects/FloorNumber');
const Direction = require('../valueobjects/Direction');

class CallRequest {
  constructor(floor, direction) {
    this.floor = floor instanceof FloorNumber ? floor : new FloorNumber(floor);
    this.direction = direction instanceof Direction ? direction : new Direction(direction);
  }
}

module.exports = CallRequest;
