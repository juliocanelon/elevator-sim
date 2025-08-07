/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, renderHook, act } from '@testing-library/react';
import ElevatorSimulation from '../../src/components/ElevatorSimulation';
import { ElevatorProvider, useElevator } from '../../src/context/ElevatorContext';

// Test component rendering
it('renders floors and elevators', () => {
  render(
    <ElevatorProvider>
      <ElevatorSimulation />
    </ElevatorProvider>
  );
  expect(screen.getByText('Floor 1')).toBeInTheDocument();
  expect(screen.getByText('Elev 1')).toBeInTheDocument();
});

// Test callElevator integrates with API and updates context
it('callElevator updates state and calls API', async () => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
  const { result } = renderHook(() => useElevator(), { wrapper: ElevatorProvider });

  await act(async () => {
    await result.current.callElevator(3, 'Up');
  });

  expect(global.fetch).toHaveBeenCalledWith(
    '/api/call',
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ floor: 3, direction: 'Up' })
    })
  );
  expect(result.current.elevators.some(e => e.targetFloors.includes(3))).toBe(true);
});

// Test selectDestination and tick integration
it('selectDestination updates targets and tick calls API', async () => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
  const { result } = renderHook(() => useElevator(), { wrapper: ElevatorProvider });

  await act(async () => {
    await result.current.selectDestination(1, 2);
  });
  expect(result.current.elevators[0].targetFloors).toContain(2);

  await act(async () => {
    await result.current.tick();
  });

  expect(global.fetch).toHaveBeenCalledWith('/api/tick', { method: 'POST' });
  expect(result.current.elevators[0].currentFloor).toBe(2);
});
