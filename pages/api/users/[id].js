import { User } from '@/mongoose/models';

async function getUser(req, res) {
  const data = await User.findById(req.query.id);
  res.status(200).json({ result: data });
};

async function putUsers(req, res) {
  const data = await User.findByIdAndUpdate(
    req.query.id, req.body, { new: true }
  );
  res.status(200).json({ result: data });
};

async function deleteUsers(req, res) {
  await User.findByIdAndRemove(req.query.id);
  res.status(200).json({ msg: 'success' });
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getUser(req, res);
    case 'PUT':
      return await putUsers(req, res);
    case 'DELETE':
      return await deleteUsers(req, res);
    default:
      return res.status(400).json({ error: 'unsupported_method' });
  }
};