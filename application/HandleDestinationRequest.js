class HandleDestinationRequest {
  constructor(destinationRepository, elevatorRepository) {
    this.destinationRepository = destinationRepository;
    this.elevatorRepository = elevatorRepository;
  }

  async execute(request) {
    await this.destinationRepository.enqueue(request);
    if (typeof this.elevatorRepository.save === 'function') {
      await this.elevatorRepository.save();
    }
  }
}

module.exports = HandleDestinationRequest;
