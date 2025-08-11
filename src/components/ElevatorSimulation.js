import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useElevator } from '../context/ElevatorContext';
import FloorButton from './FloorButton';
import DestinationPanel from './DestinationPanel';

const FLOOR_COUNT = 5;

function getBadgeVariant(state) {
  switch (state) {
    case 'MovingUp':
    case 'MovingDown':
      return 'warning';
    case 'Loading':
      return 'danger';
    default:
      return 'secondary';
  }
}

function getBadgeText(state) {
  switch (state) {
    case 'MovingUp':
      return '↑';
    case 'MovingDown':
      return '↓';
    case 'Idle':
      return 'Inactivo';
    default:
      return state;
  }
}

function ElevatorSimulation() {
  const { elevators, tick } = useElevator();
  const floors = Array.from({ length: FLOOR_COUNT }, (_, i) => i + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <Container className="mt-4">
      <Row>
        <Col sm={3}>
          <div className="floor-panel">
            {floors
              .slice()
              .reverse()
              .map(f => (
                <div
                  key={f}
                  className="d-flex align-items-center justify-content-between mb-2"
                  style={{ height: 'var(--floor-height)' }}
                >
                  <span className="me-2">Floor {f}</span>
                  <FloorButton floor={f} />
                </div>
              ))}
          </div>
        </Col>
        <Col sm={9}>
          <div className="building">
            {elevators.map(e => (
              <div key={e.id} className="shaft">
                <div
                  className="cabin"
                  style={{
                    transform: `translateY(calc((${FLOOR_COUNT} - ${e.currentFloor}) * var(--floor-height)))`,
                  }}
                >
                  <div className="floor-indicator mb-1">{e.currentFloor}</div>
                  <Badge bg={getBadgeVariant(e.state)} className="mb-1">
                    {getBadgeText(e.state)}
                  </Badge>
                  <Card className="shadow-sm rounded w-100">
                    <Card.Body className="p-2">
                      <div className="mb-2 text-center">Elev {e.id}</div>
                      <DestinationPanel elevatorId={e.id} floors={floors} />
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ElevatorSimulation;
