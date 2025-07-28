// infrastructure/TimeProviderSystem.js
const TimeProvider = require('../application/ports/TimeProvider');

class TimeProviderSystem extends TimeProvider {
  now() {
    throw new Error('Not implemented');
  }
}

module.exports = TimeProviderSystem;
