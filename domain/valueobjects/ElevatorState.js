class ElevatorState {
  constructor(value) {
    const allowed = ['Idle', 'MovingUp', 'MovingDown', 'Loading'];
    if (!allowed.includes(value)) {
      throw new Error('Invalid elevator state.');
    }
    this.value = value;
  }
}

module.exports = ElevatorState;
