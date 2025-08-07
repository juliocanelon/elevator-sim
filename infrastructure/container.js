const Elevator = require('../domain/entities/Elevator');
const CallRequestRepositoryMemory = require('./CallRequestRepositoryMemory');
const DestinationRequestRepositoryMemory = require('./DestinationRequestRepositoryMemory');
const ElevatorRepositoryHttp = require('./ElevatorRepositoryHttp');
const ElevatorDispatcher = require('../domain/services/ElevatorDispatcher');
const TimeProviderSystem = require('./TimeProviderSystem');

// Singleton repositories and services to maintain state between requests
const callRepo = new CallRequestRepositoryMemory();
const destRepo = new DestinationRequestRepositoryMemory();
const elevatorRepo = new ElevatorRepositoryHttp([
  new Elevator('E1', 1),
  new Elevator('E2', 5)
]);

const dispatcher = new ElevatorDispatcher(elevatorRepo, callRepo, destRepo);
const timeProvider = new TimeProviderSystem();

module.exports = {
  callRepo,
  destRepo,
  elevatorRepo,
  dispatcher,
  timeProvider
};
