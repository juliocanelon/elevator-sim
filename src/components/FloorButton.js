import React from 'react';
import { useElevator } from '../context/ElevatorContext';

function FloorButton({ floor }) {
  const { callElevator } = useElevator();

  return (
    <button type="button" className="btn btn-sm btn-secondary" onClick={() => callElevator(floor, 'Up')}>
      Call
    </button>
  );
}

export default FloorButton;
