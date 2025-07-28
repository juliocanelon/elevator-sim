class ElevatorDispatcher {
  constructor(elevatorRepo, callRepo, destRepo) {
    this.elevatorRepo = elevatorRepo;
    this.callRepo = callRepo;
    this.destRepo = destRepo;
  }

  async dispatchCall(callRequest) {
    throw new Error('not implemented');
  }

  async dispatchDestination(destRequest) {
    throw new Error('not implemented');
  }

  async handleTick(timeProvider) {
    throw new Error('not implemented');
  }
}

module.exports = ElevatorDispatcher;
