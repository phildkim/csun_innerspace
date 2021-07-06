import { Result } from '@/mongoose/models';

export default async function (req, res) {
  if (req.method !== 'GET')
    return res.status(400).json({ error: 'unsupported_method' });
  try {
    const results = await Result.find({ user: req.query.id });
    res.status(200).json({ result: results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error: ' + err });
  }
};
