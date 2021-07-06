import { Program } from '@/mongoose/models';

async function getProgram(req, res) {
  const data = await Program.findById(req.query.id);
  res.status(200).json({ result: data });
};

async function putProgram(req, res) {
  const data = await Program.findByIdAndUpdate(
    req.query.id, req.body, { new: true }
  );
  res.status(200).json({ result: data });
};

async function deleteProgram(req, res) {
  await Program.findByIdAndRemove(req.query.id);
  res.status(200).json({ msg: 'success' });
};

export default async function (req, res) {
  switch (req.method) {
    case 'GET':
      return await getProgram(req, res);
    case 'PUT':
      return await putProgram(req, res);
    case 'DELETE':
      return await deleteProgram(req, res);
    default:
      return res.status(400).json({ error: 'unsupported_method' });
  }
};
