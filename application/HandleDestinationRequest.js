class HandleDestinationRequest {
  constructor(dispatcher, eventPublisher) {
    this.dispatcher = dispatcher;
    this.eventPublisher = eventPublisher;
  }

  async execute(request) {
    if (this.dispatcher && typeof this.dispatcher.dispatchDestination === 'function') {
      await this.dispatcher.dispatchDestination(request);
    }
    if (this.eventPublisher && typeof this.eventPublisher.publish === 'function') {
      await this.eventPublisher.publish({ type: 'DestinationQueued', request });
    }
  }
}

module.exports = HandleDestinationRequest;
