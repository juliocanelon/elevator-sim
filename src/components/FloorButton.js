import React from 'react';
import Button from 'react-bootstrap/Button';
import { useElevator } from '../context/ElevatorContext';

function FloorButton({ floor }) {
  const { callElevator } = useElevator();

  return (
    <div className="btn-group">
      {floor !== 5 && (
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => callElevator(floor, 'Up')}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </Button>
      )}
      {floor !== 1 && (
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => callElevator(floor, 'Down')}
        >
          <i className="fa-solid fa-arrow-down"></i>
        </Button>
      )}
    </div>
  );
}

export default FloorButton;
