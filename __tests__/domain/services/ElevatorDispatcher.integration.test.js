const ElevatorDispatcher = require('../../../domain/services/ElevatorDispatcher');
const ElevatorRepositoryHttp = require('../../../infrastructure/ElevatorRepositoryHttp');
const CallRequestRepositoryMemory = require('../../../infrastructure/CallRequestRepositoryMemory');
const DestinationRequestRepositoryMemory = require('../../../infrastructure/DestinationRequestRepositoryMemory');
const Elevator = require('../../../domain/entities/Elevator');
const CallRequest = require('../../../domain/entities/CallRequest');
const DestinationRequest = require('../../../domain/entities/DestinationRequest');
const ElevatorState = require('../../../domain/valueobjects/ElevatorState');

describe('ElevatorDispatcher integration', () => {
  test('processes requests with multiple elevators using real repositories', async () => {
    const e1 = new Elevator('E1', 1);
    const e2 = new Elevator('E2', 5);
    e1.state = new ElevatorState('Idle');
    e2.state = new ElevatorState('Idle');

    const elevatorRepo = new ElevatorRepositoryHttp([e1, e2]);
    const callRepo = new CallRequestRepositoryMemory();
    const destRepo = new DestinationRequestRepositoryMemory();

    const dispatcher = new ElevatorDispatcher(elevatorRepo, callRepo, destRepo);

    await dispatcher.dispatchCall(new CallRequest(4, 'Down'));
    await dispatcher.dispatchDestination(new DestinationRequest(2));

    await dispatcher.handleTick({ now: () => Date.now() });

    const savedE1 = await elevatorRepo.findById('E1');
    const savedE2 = await elevatorRepo.findById('E2');

    expect(savedE2.targetFloors[0].value).toBe(4);
    expect(savedE1.targetFloors[0].value).toBe(2);
  });
});
