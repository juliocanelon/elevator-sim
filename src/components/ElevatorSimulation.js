import React from 'react';
import { useElevator } from '../context/ElevatorContext';

function ElevatorSimulation() {
  const { elevators } = useElevator();

  return (
    <div>
      {elevators.map(e => (
        <div key={e.id}>
          Elevator {e.id}: floor {e.currentFloor} — state {e.state}
        </div>
      ))}
    </div>
  );
}

export default ElevatorSimulation;
