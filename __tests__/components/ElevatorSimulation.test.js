/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, renderHook, act, within, waitFor } from '@testing-library/react';
import ElevatorSimulation from '../../src/components/ElevatorSimulation';
import { ElevatorProvider, useElevator } from '../../src/context/ElevatorContext';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([
    { id: 'A1', currentFloor: 1, state: 'Idle', targetFloors: [] },
    { id: 'A2', currentFloor: 5, state: 'Idle', targetFloors: [] }
  ]) }));
});

// Test component rendering
it('renders floors and elevators', async () => {
  await act(async () => {
    render(
      <ElevatorProvider>
        <ElevatorSimulation />
      </ElevatorProvider>
    );
  });
  await screen.findByText('Floor 1');
  await screen.findByText('Elev A1');
  await screen.findByText('Elev A2');
});

it('renders appropriate call buttons on each floor', () => {
  render(
    <ElevatorProvider>
      <ElevatorSimulation />
    </ElevatorProvider>
  );

  const floor1 = within(screen.getByText('Floor 1').parentElement).getAllByRole('button');
  expect(floor1).toHaveLength(1);
  expect(floor1[0].querySelector('.fa-arrow-up')).toBeInTheDocument();

  const floor3 = within(screen.getByText('Floor 3').parentElement).getAllByRole('button');
  expect(floor3).toHaveLength(2);

  const floor5 = within(screen.getByText('Floor 5').parentElement).getAllByRole('button');
  expect(floor5).toHaveLength(1);
  expect(floor5[0].querySelector('.fa-arrow-down')).toBeInTheDocument();
});

// Test callElevator integrates with API and updates context
it('callElevator updates state and calls API', async () => {
  const initial = [
    { id: 'A1', currentFloor: 1, state: 'Idle', targetFloors: [] },
    { id: 'A2', currentFloor: 5, state: 'Idle', targetFloors: [] }
  ];
  const afterCall = [
    { id: 'A1', currentFloor: 1, state: 'Idle', targetFloors: [3] },
    { id: 'A2', currentFloor: 5, state: 'Idle', targetFloors: [] }
  ];
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(initial) })
    .mockResolvedValueOnce({ ok: true })
    .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(afterCall) });

  const { result } = renderHook(() => useElevator(), { wrapper: ElevatorProvider });
  await waitFor(() => expect(result.current.elevators.length).toBe(2));

  await act(async () => {
    await result.current.callElevator(3, 'Up');
  });

  expect(global.fetch).toHaveBeenNthCalledWith(
    2,
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
  const initial = [
    { id: 'A1', currentFloor: 1, state: 'Idle', targetFloors: [] },
    { id: 'A2', currentFloor: 5, state: 'Idle', targetFloors: [] }
  ];
  const afterTick = [
    { id: 'A1', currentFloor: 2, state: 'Idle', targetFloors: [] },
    { id: 'A2', currentFloor: 5, state: 'Idle', targetFloors: [] }
  ];
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(initial) })
    .mockResolvedValueOnce({ ok: true })
    .mockResolvedValueOnce({ ok: true })
    .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(afterTick) });

  const { result } = renderHook(() => useElevator(), { wrapper: ElevatorProvider });
  await waitFor(() => expect(result.current.elevators.length).toBe(2));

  await act(async () => {
    await result.current.selectDestination('A1', 2);
  });
  await waitFor(() => expect(result.current.elevators[0].targetFloors).toContain(2));

  await act(async () => {
    await result.current.tick();
  });

  expect(global.fetch).toHaveBeenNthCalledWith(3, '/api/tick', { method: 'POST' });
  expect(result.current.elevators[0].currentFloor).toBe(2);
});
