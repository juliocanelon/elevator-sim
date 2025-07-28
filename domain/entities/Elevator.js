const FloorNumber = require('../valueobjects/FloorNumber');
const ElevatorState = require('../valueobjects/ElevatorState');

class Elevator {
  constructor(id, currentFloor = new FloorNumber(1)) {
    this.id = id;
    this.currentFloor = currentFloor instanceof FloorNumber ? currentFloor : new FloorNumber(currentFloor);
    this.targetFloors = [];
    this.state = new ElevatorState('Idle');
  }

  addDestination(floor) {
    const dest = floor instanceof FloorNumber ? floor : new FloorNumber(floor);
    if (!this.targetFloors.some(f => f.value === dest.value)) {
      this.targetFloors.push(dest);
    }
  }

  move() {
    if (this.targetFloors.length === 0) {
      this.state = new ElevatorState('Idle');
      return;
    }
    const next = this.targetFloors[0];
    if (this.currentFloor.value < next.value) {
      this.currentFloor = new FloorNumber(this.currentFloor.value + 1);
      this.state = new ElevatorState('MovingUp');
    } else if (this.currentFloor.value > next.value) {
      this.currentFloor = new FloorNumber(this.currentFloor.value - 1);
      this.state = new ElevatorState('MovingDown');
    } else {
      this.targetFloors.shift();
      this.state = new ElevatorState('Loading');
    }
  }
}

module.exports = Elevator;
