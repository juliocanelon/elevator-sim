class Direction {
  constructor(value) {
    if (value !== 'Up' && value !== 'Down') {
      throw new Error('Direction must be "Up" or "Down".');
    }
    this.value = value;
  }
}

module.exports = Direction;
