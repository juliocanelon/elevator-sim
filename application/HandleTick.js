class HandleTick {
  constructor(dispatcher, eventPublisher, timeProvider) {
    this.dispatcher = dispatcher;
    this.eventPublisher = eventPublisher;
    this.timeProvider = timeProvider;
  }

  async execute() {
    if (this.dispatcher && typeof this.dispatcher.handleTick === 'function') {
      await this.dispatcher.handleTick(this.timeProvider);
    }

    const elevators = this.dispatcher && this.dispatcher.elevatorRepo
      ? await this.dispatcher.elevatorRepo.findAll()
      : [];

    if (this.eventPublisher && typeof this.eventPublisher.publish === 'function') {
      for (const elevator of elevators) {
        await this.eventPublisher.publish({
          type: 'ElevatorUpdated',
          id: elevator.id,
          floor: elevator.currentFloor.value,
          state: elevator.state.value,
          targets: elevator.targetFloors.map(f => f.value),
          timestamp: this.timeProvider.now(),
        });
      }
    }
  }
}

module.exports = HandleTick;
