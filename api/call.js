const HandleExternalCall = require('../application/HandleExternalCall');
const CallRequest = require('../domain/entities/CallRequest');
const { callRepo, elevatorRepo } = require('../infrastructure/container');

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
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    const body = await parseBody(req);
    const { floor, direction } = body;
    const handler = new HandleExternalCall(callRepo, elevatorRepo);
    await handler.execute(new CallRequest(floor, direction));
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
