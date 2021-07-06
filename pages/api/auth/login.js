import { User } from '@/mongoose/models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_JWT_KEY = `${process.env.SECRET_JWT_API_KEY}`;
export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(400).json({ error: 'Unsupported method' });
  if (!req.body)
    return res.status(400).json({ error: 'Invalid body' });
  try {
    const { user, pass } = req.body;
    const data = await User.findOne({ username: user });
    if (!data)
      return res.status(400).json({ error: 'User Not Found' });
    const match = bcrypt.compareSync(pass, data.passwordHash);
    if (!match)
      return res.status(400).json({ error: 'Password Incorrect' });
    const { _id, fullname, usertype, username, passwordHash, lastOnline } = data;
    const payload = { _id, fullname, usertype, username, passwordHash, lastOnline };
    const token = jwt.sign(payload, SECRET_JWT_KEY);
    return res.status(200).json({ token, usertype });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error: ' + err });
  }
};