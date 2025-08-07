import React from 'react';
import { useElevator } from '../context/ElevatorContext';
import FloorButton from './FloorButton';
import DestinationPanel from './DestinationPanel';

const FLOOR_COUNT = 5;
const FLOOR_HEIGHT = 80;

function ElevatorSimulation() {
  const { elevators } = useElevator();
  const floors = Array.from({ length: FLOOR_COUNT }, (_, i) => i + 1);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-3">
          {floors
            .slice()
            .reverse()
            .map(f => (
              <div
                key={f}
                className="d-flex align-items-center justify-content-between mb-2"
                style={{ height: FLOOR_HEIGHT }}
              >
                <span className="me-2">Floor {f}</span>
                <FloorButton floor={f} />
              </div>
            ))}
        </div>
        <div className="col-9">
          <div
            className="position-relative border"
            style={{ height: FLOOR_COUNT * FLOOR_HEIGHT }}
          >
            {elevators.map(e => (
              <div
                key={e.id}
                className="bg-primary text-white p-2 rounded position-absolute"
                style={{
                  width: 80,
                  height: FLOOR_HEIGHT - 10,
                  left: (e.id - 1) * 100,
                  transition: 'top 1s linear',
                  top: (FLOOR_COUNT - e.currentFloor) * FLOOR_HEIGHT,
                }}
              >
                <div className="mb-2">Elev {e.id}</div>
                <DestinationPanel elevatorId={e.id} floors={floors} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElevatorSimulation;
