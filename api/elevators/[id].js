const { elevatorRepo } = require('../../infrastructure/container');

async function parseBody(req) {
  if (req.body) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  const { id } = req.query || {};
  if (req.method === 'GET') {
    try {
      const e = await elevatorRepo.findById(id);
      if (!e) {
        res.status(404).json({ error: 'Not Found' });
        return;
      }
      res.status(200).json({
        id: e.id,
        currentFloor: e.currentFloor.value,
        state: e.state.value,
        targetFloors: e.targetFloors.map(f => f.value)
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const body = await parseBody(req);
      await elevatorRepo.save({
        id,
        currentFloor: body.currentFloor,
        state: body.state,
        targetFloors: body.targetFloors || []
      });
      res.status(200).json({ status: 'ok' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
