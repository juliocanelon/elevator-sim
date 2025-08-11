import React from 'react';
import Button from 'react-bootstrap/Button';
import { useElevator } from '../context/ElevatorContext';

function DestinationPanel({ elevatorId, floors }) {
  const { selectDestination, elevators } = useElevator();
  const elevator = elevators.find(e => e.id === elevatorId);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {floors.map(f => {
        const active = elevator?.targetFloors.includes(f);
        return (
          <Button
            key={f}
            size="sm"
            variant={active ? 'primary' : 'light'}
            className="m-1"
            onClick={() => selectDestination(elevatorId, f)}
          >
            {f}
          </Button>
        );
      })}
    </div>
  );
}

export default DestinationPanel;
