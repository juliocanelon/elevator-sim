class HandleExternalCall {
    constructor(callRepository, elevatorRepository) {
      this.callRepository = callRepository;
      this.elevatorRepository = elevatorRepository;
    }
  
    async execute(request) {
      await this.callRepository.enqueue(request);
      if (typeof this.elevatorRepository.save === 'function') {
        await this.elevatorRepository.save();
      }
    }
  }
  
  module.exports = HandleExternalCall;