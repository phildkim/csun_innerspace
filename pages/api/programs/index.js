import { Program } from '@/mongoose/models';

async function getPrograms(req, res) {
  const data = await Program.find({});
  res.status(200).json({ result: data });
};

async function postPrograms(req, res) {
  const data = await Program.create(req.body);
  res.status(200).json({ result: data });
};

export default async function (req, res) {
  switch (req.method) {
    case 'GET':
      return await getPrograms(req, res);
    case 'POST':
      return await postPrograms(req, res);
    default:
      return res.status(400).json({ error: 'unsupported_method' });
  }
};
