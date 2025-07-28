const Building = require('../entities/Building');

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
    const building = new Building(elevators);
    const calls = await this.callRepo.dequeueAll();
    const destinations = await this.destRepo.dequeueAll();

    for (const call of calls) {
      building.handleCall(call);
    }

    for (const dest of destinations) {
      building.handleDestination(dest);
    }

    for (const elevator of building.getElevators()) {
      elevator.move();
      await this.elevatorRepo.save(elevator);
    }
  }
}

module.exports = ElevatorDispatcher;