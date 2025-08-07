import React from 'react';
import Button from 'react-bootstrap/Button';
import { useElevator } from '../context/ElevatorContext';

function DestinationPanel({ elevatorId, floors }) {
  const { selectDestination } = useElevator();

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {floors.map(f => (
        <Button
          key={f}
          size="sm"
          variant="light"
          className="m-1"
          onClick={() => selectDestination(elevatorId, f)}
        >
          {f}
        </Button>
      ))}
    </div>
  );
}

export default DestinationPanel;
