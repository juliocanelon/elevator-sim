const HandleTick = require('../application/HandleTick');
const { callRepo, destRepo, elevatorRepo, dispatcher, timeProvider } = require('../infrastructure/container');

module.exports = async (req, res) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    const handler = new HandleTick(callRepo, destRepo, elevatorRepo, dispatcher, timeProvider);
    await handler.execute();
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
