class FloorNumber {
  constructor(value) {
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      throw new Error('FloorNumber must be an integer between 1 and 5.');
    }
    this.value = value;
  }
}

module.exports = FloorNumber;
