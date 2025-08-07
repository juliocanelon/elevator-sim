import React from 'react';
import ElevatorSimulation from './components/ElevatorSimulation';
import Header from './components/Header';
import { ElevatorProvider } from './context/ElevatorContext';

function App() {
  return (
    <ElevatorProvider>
      <Header />
      <ElevatorSimulation />
    </ElevatorProvider>
  );
}

export default App;
