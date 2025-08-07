import React, { createContext, useContext, useState, useCallback } from 'react';

const ElevatorContext = createContext();

const initialElevators = [
  { id: 1, currentFloor: 1, targetFloors: [], state: 'Idle' },
  { id: 2, currentFloor: 1, targetFloors: [], state: 'Idle' },
  { id: 3, currentFloor: 1, targetFloors: [], state: 'Idle' }
];

export const ElevatorProvider = ({ children }) => {
  const [elevators, setElevators] = useState(initialElevators);

  const tick = useCallback(async () => {
    try {
      await fetch('/api/tick', { method: 'POST' });
    } catch (err) {
      console.error('tick failed', err);
    }
    setElevators(prev =>
      prev.map(e => {
        if (e.targetFloors.length === 0) {
          return { ...e, state: 'Idle' };
        }
        const target = e.targetFloors[0];
        if (e.currentFloor < target) {
          return { ...e, currentFloor: e.currentFloor + 1, state: 'MovingUp' };
        }
        if (e.currentFloor > target) {
          return { ...e, currentFloor: e.currentFloor - 1, state: 'MovingDown' };
        }
        const remaining = e.targetFloors.slice(1);
        return {
          ...e,
          targetFloors: remaining,
          state: remaining.length === 0 ? 'Idle' : e.state,
        };
      })
    );
  }, []);

  const callElevator = async (floor, direction) => {
    try {
      await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ floor, direction }),
      });
    } catch (err) {
      console.error('call failed', err);
    }
    setElevators(prev => {
      const best = prev.reduce((prevElevator, curr) => {
        const prevDist = Math.abs(prevElevator.currentFloor - floor);
        const currDist = Math.abs(curr.currentFloor - floor);
        return currDist < prevDist ? curr : prevElevator;
      }, prev[0]);

      return prev.map(e =>
        e.id === best.id
          ? {
              ...e,
              targetFloors: e.targetFloors.includes(floor)
                ? e.targetFloors
                : [...e.targetFloors, floor],
            }
          : e
      );
    });
  };

  const selectDestination = async (elevatorId, floor) => {
    setElevators(prev =>
      prev.map(e =>
        e.id === elevatorId
          ? {
              ...e,
              targetFloors: e.targetFloors.includes(floor)
                ? e.targetFloors
                : [...e.targetFloors, floor],
            }
          : e
      )
    );
  };

  return (
    <ElevatorContext.Provider value={{ elevators, callElevator, selectDestination, tick }}>
      {children}
    </ElevatorContext.Provider>
  );
};

export const useElevator = () => {
  const ctx = useContext(ElevatorContext);
  if (!ctx) {
    throw new Error('useElevator must be used within an ElevatorProvider');
  }
  return ctx;
};

export default ElevatorContext;
