const FloorNumber = require('../valueobjects/FloorNumber');

class DestinationRequest {
  constructor(floor) {
    this.floor = floor instanceof FloorNumber ? floor : new FloorNumber(floor);
  }
}

module.exports = DestinationRequest;
