import React from 'react';
import { useElevator } from '../context/ElevatorContext';

function DestinationPanel({ elevatorId, floors }) {
  const { selectDestination } = useElevator();

  return (
    <div className="btn-group flex-wrap">
      {floors.map(f => (
        <button
          key={f}
          type="button"
          className="btn btn-sm btn-light m-1"
          onClick={() => selectDestination(elevatorId, f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

export default DestinationPanel;
