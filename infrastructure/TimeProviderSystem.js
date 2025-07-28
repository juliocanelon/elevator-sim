// infrastructure/TimeProviderSystem.js
const TimeProvider = require('../application/ports/TimeProvider');

class TimeProviderSystem extends TimeProvider {
  now() {
    return Date.now();
  }
}

module.exports = TimeProviderSystem;
