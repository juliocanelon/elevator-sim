import React, { createContext, useContext, useState } from 'react';

const ElevatorContext = createContext();

const initialElevators = [
  { id: 1, currentFloor: 1, targetFloors: [], state: 'Idle' },
  { id: 2, currentFloor: 1, targetFloors: [], state: 'Idle' },
  { id: 3, currentFloor: 1, targetFloors: [], state: 'Idle' }
];

export const ElevatorProvider = ({ children }) => {
  const [elevators, setElevators] = useState(initialElevators);

  const callElevator = (floor, _direction) => {
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
                : [...e.targetFloors, floor]
            }
          : e
      );
    });
  };

  const selectDestination = (elevatorId, floor) => {
    setElevators(prev =>
      prev.map(e =>
        e.id === elevatorId
          ? {
              ...e,
              targetFloors: e.targetFloors.includes(floor)
                ? e.targetFloors
                : [...e.targetFloors, floor]
            }
          : e
      )
    );
  };

  return (
    <ElevatorContext.Provider value={{ elevators, callElevator, selectDestination }}>
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
