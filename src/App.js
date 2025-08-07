import React from 'react';
import ElevatorSimulation from './components/ElevatorSimulation';
import { ElevatorProvider } from './context/ElevatorContext';

function App() {
  return (
    <ElevatorProvider>
      <ElevatorSimulation />
    </ElevatorProvider>
  );
}

export default App;
