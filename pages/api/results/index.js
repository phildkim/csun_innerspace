import { Result } from '@/mongoose/models';

export default async function (req, res) {
  if (req.method !== 'POST')
    return res.status(400).json({ error: 'unsupported_method' });
  try {
    const data = await Result.create(req.body);
    return res.status(200).json({ result: data });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error: ' + err });
  }
};