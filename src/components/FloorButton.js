import React from 'react';
import Button from 'react-bootstrap/Button';
import { useElevator } from '../context/ElevatorContext';

function FloorButton({ floor }) {
  const { callElevator, hallCalls } = useElevator();
  const isUpPending = hallCalls.some(c => c.floor === floor && c.direction === 'Up');
  const isDownPending = hallCalls.some(c => c.floor === floor && c.direction === 'Down');

  return (
    <div className="btn-group">
      {floor !== 5 && (
        <Button
          size="sm"
          variant={isUpPending ? 'primary' : 'outline-primary'}
          onClick={() => callElevator(floor, 'Up')}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </Button>
      )}
      {floor !== 1 && (
        <Button
          size="sm"
          variant={isDownPending ? 'primary' : 'outline-primary'}
          onClick={() => callElevator(floor, 'Down')}
        >
          <i className="fa-solid fa-arrow-down"></i>
        </Button>
      )}
    </div>
  );
}

export default FloorButton;
