class ElevatorDispatcher {
  constructor(elevatorRepo, callRepo, destRepo) {
    this.elevatorRepo = elevatorRepo;
    this.callRepo = callRepo;
    this.destRepo = destRepo;
  }

  async dispatchCall(callRequest) {
    await this.callRepo.enqueue(callRequest);
  }

  async dispatchDestination(destRequest) {
    await this.destRepo.enqueue(destRequest);
  }

  async handleTick(timeProvider) {
    const elevators = await this.elevatorRepo.findAll();
    const calls = await this.callRepo.dequeueAll();
    const destinations = await this.destRepo.dequeueAll();

    if (elevators.length > 0) {
      const primary = elevators[0];

      for (const call of calls) {
        primary.addDestination(call.floor);
      }

      for (const dest of destinations) {
        primary.addDestination(dest.floor);
      }
    }

    for (const elevator of elevators) {
      elevator.move();
      await this.elevatorRepo.save(elevator);
    }
  }
}

module.exports = ElevatorDispatcher;