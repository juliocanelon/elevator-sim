const { elevatorRepo } = require('../../infrastructure/container');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    const elevators = await elevatorRepo.findAll();
    const plain = elevators.map(e => ({
      id: e.id,
      currentFloor: e.currentFloor.value,
      state: e.state.value,
      targetFloors: e.targetFloors.map(f => f.value)
    }));
    res.status(200).json(plain);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
