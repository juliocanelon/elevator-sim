const FloorNumber = require('../valueobjects/FloorNumber');
const Direction = require('../valueobjects/Direction');

class Building {
  constructor(elevators = []) {
    this.elevators = elevators;
  }

  addElevator(elevator) {
    this.elevators.push(elevator);
  }

  getElevators() {
    return this.elevators;
  }

  findBestElevator(floor, direction) {
    const target = floor instanceof FloorNumber ? floor : new FloorNumber(floor);
    let best = null;
    let bestScore = Infinity;

    for (const elevator of this.elevators) {
      let score = Math.abs(elevator.currentFloor.value - target.value);
      const state = elevator.state.value;

      if (direction instanceof Direction) {
        if (state === 'MovingUp') {
          if (!(direction.value === 'Up' && elevator.currentFloor.value <= target.value)) {
            score += 1000;
          }
        } else if (state === 'MovingDown') {
          if (!(direction.value === 'Down' && elevator.currentFloor.value >= target.value)) {
            score += 1000;
          }
        }
      }

      if (elevator.targetFloors.length > 0 || state !== 'Idle') {
        score += 1000;
      }

      if (score < bestScore) {
        bestScore = score;
        best = elevator;
      }
    }

    return best;
  }

  handleCall(callRequest) {
    const elevator = this.findBestElevator(callRequest.floor, callRequest.direction);
    if (elevator) {
      elevator.addDestination(callRequest.floor);
    }
  }

  handleDestination(destRequest) {
    const elevator = this.findBestElevator(destRequest.floor);
    if (elevator) {
      elevator.addDestination(destRequest.floor);
    }
  }
}

module.exports = Building;
