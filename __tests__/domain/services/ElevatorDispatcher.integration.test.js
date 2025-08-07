const ElevatorDispatcher = require('../../../domain/services/ElevatorDispatcher');
const Elevator = require('../../../domain/entities/Elevator');
const CallRequest = require('../../../domain/entities/CallRequest');
const DestinationRequest = require('../../../domain/entities/DestinationRequest');
const CallRequestRepositoryMemory = require('../../../infrastructure/CallRequestRepositoryMemory');
const DestinationRequestRepositoryMemory = require('../../../infrastructure/DestinationRequestRepositoryMemory');
const ElevatorRepositoryHttp = require('../../../infrastructure/ElevatorRepositoryHttp');

// This test uses real repositories to verify dispatcher behaviour with multiple elevators

describe('ElevatorDispatcher integration', () => {
  test('processes calls and destinations for multiple elevators', async () => {
    const elevatorRepo = new ElevatorRepositoryHttp([
      new Elevator('E1', 1),
      new Elevator('E2', 5)
    ]);
    const callRepo = new CallRequestRepositoryMemory();
    const destRepo = new DestinationRequestRepositoryMemory();
    const dispatcher = new ElevatorDispatcher(elevatorRepo, callRepo, destRepo);

    await callRepo.enqueue(new CallRequest(4, 'Down'));
    await destRepo.enqueue(new DestinationRequest(2));

    await dispatcher.handleTick({ now: () => Date.now() });

    let e1 = await elevatorRepo.findById('E1');
    let e2 = await elevatorRepo.findById('E2');
    expect(e1.currentFloor.value).toBe(2);
    expect(e1.state.value).toBe('MovingUp');
    expect(e1.targetFloors[0].value).toBe(2);
    expect(e2.currentFloor.value).toBe(4);
    expect(e2.state.value).toBe('MovingDown');
    expect(e2.targetFloors[0].value).toBe(4);

    await dispatcher.handleTick({ now: () => Date.now() });

    e1 = await elevatorRepo.findById('E1');
    e2 = await elevatorRepo.findById('E2');
    expect(e1.currentFloor.value).toBe(2);
    expect(e1.state.value).toBe('Loading');
    expect(e1.targetFloors.length).toBe(0);
    expect(e2.currentFloor.value).toBe(4);
    expect(e2.state.value).toBe('Loading');
    expect(e2.targetFloors.length).toBe(0);
  });
});
