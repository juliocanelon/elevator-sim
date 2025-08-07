class HandleExternalCall {
  constructor(dispatcher, eventPublisher) {
    this.dispatcher = dispatcher;
    this.eventPublisher = eventPublisher;
  }

  async execute(request) {
    if (this.dispatcher && typeof this.dispatcher.dispatchCall === 'function') {
      await this.dispatcher.dispatchCall(request);
    }
    if (this.eventPublisher && typeof this.eventPublisher.publish === 'function') {
      await this.eventPublisher.publish({ type: 'CallQueued', request });
    }
  }
}

module.exports = HandleExternalCall;
