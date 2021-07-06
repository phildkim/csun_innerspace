import { User } from '@/mongoose/models';

async function getUsers(req, res) {
  const data = await User.find({});
  res.status(200).json({ result: data });
};

async function postUsers(req, res) {
  const data = await User.create(req.body);
  res.status(200).json({ result: data });
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getUsers(req, res);
    case 'POST':
      return await postUsers(req, res);
    default:
      return res.status(400).json({ error: 'unsupported_method' });
  }
};
