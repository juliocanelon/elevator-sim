class HandleTick {
    constructor(callRepo, destRepo, elevatorRepo, dispatcher, timeProvider) {
      this.callRepo = callRepo;
      this.destRepo = destRepo;
      this.elevatorRepo = elevatorRepo;
      this.dispatcher = dispatcher;
      this.timeProvider = timeProvider;
    }
  
    async execute() {
      const calls = await this.callRepo.dequeueAll();
      const destinations = await this.destRepo.dequeueAll();
      const elevators = await this.elevatorRepo.findAll();
  
      if (this.dispatcher) {
        for (const call of calls) {
          if (typeof this.dispatcher.dispatchCall === 'function') {
            await this.dispatcher.dispatchCall(call);
          }
        }
        for (const dest of destinations) {
          if (typeof this.dispatcher.dispatchDestination === 'function') {
            await this.dispatcher.dispatchDestination(dest);
          }
        }
      }
  
      for (const elevator of elevators) {
        if (typeof elevator.move === 'function') {
          elevator.move();
        }
        await this.elevatorRepo.save(elevator);
      }
    }
  }
  
  module.exports = HandleTick;