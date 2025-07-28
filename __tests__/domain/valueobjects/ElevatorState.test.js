const ElevatorState = require('../../../domain/valueobjects/ElevatorState');

describe('ElevatorState', () => {
  const validStates = ['Idle', 'MovingUp', 'MovingDown', 'Loading'];

  test('accepts valid states', () => {
    validStates.forEach(state => {
      expect(new ElevatorState(state).value).toBe(state);
    });
  });

  test('throws for invalid state', () => {
    expect(() => new ElevatorState('Flying')).toThrow(Error);
  });
});
