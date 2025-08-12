import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ElevatorContext = createContext();

export const ElevatorProvider = ({ children }) => {
  const [elevators, setElevators] = useState([]);

  const loadElevators = useCallback(async () => {
    try {
      const res = await fetch('/api/elevators');
      if (res.ok) {
        const data = await res.json();
        setElevators(data);
      }
    } catch (err) {
      console.error('failed to load elevators', err);
    }
  }, []);

  useEffect(() => {
    loadElevators();
  }, [loadElevators]);

  const tick = useCallback(async () => {
    try {
      await fetch('/api/tick', { method: 'POST' });
      await loadElevators();
    } catch (err) {
      console.error('tick failed', err);
    }
  }, [loadElevators]);

  const callElevator = async (floor, direction) => {
    try {
      await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ floor, direction }),
      });
      await loadElevators();
    } catch (err) {
      console.error('call failed', err);
    }
  };

  const selectDestination = async (elevatorId, floor) => {
    setElevators(prev => {
      const updated = prev.map(e =>
        e.id === elevatorId
          ? {
              ...e,
              targetFloors: e.targetFloors.includes(floor)
                ? e.targetFloors
                : [...e.targetFloors, floor],
            }
          : e
      );
      const selected = updated.find(e => e.id === elevatorId);
      fetch(`/api/elevators/${elevatorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selected),
      }).catch(err => console.error('save failed', err));
      return updated;
    });
  };

  return (
    <ElevatorContext.Provider value={{ elevators, callElevator, selectDestination, tick }}>
      {children}
    </ElevatorContext.Provider>
  );
};

export const useElevator = () => {
  const ctx = useContext(ElevatorContext);
  if (!ctx) {
    throw new Error('useElevator must be used within an ElevatorProvider');
  }
  return ctx;
};

export default ElevatorContext;
