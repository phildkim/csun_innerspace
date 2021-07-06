import { User } from '@/mongoose/models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(400).json({ error: 'Unsupported method' });
  if (!req.body)
    return res.status(400).json({ error: 'Invalid body' });

  try {
    const { name, type, user, password, passwordConfirm, date } = req.body;
    const uid = await User.findOne({ username: user });
    if (uid)
      return res.status(400).json({ error: 'Username already exists' });
    if (password !== passwordConfirm)
      return res.status(400).json({ error: 'Password Does Not Match' });
    const data = await User.create({
      fullname: name,
      usertype: type,
      username: user,
      passwordHash: `${bcrypt.hashSync(password, 10)}`,
      lastOnline: date
    });
    const { _id, fullname, usertype, username, passwordHash, lastOnline } = data;
    const payload = { _id, fullname, usertype, username, passwordHash, lastOnline };
    const token = jwt.sign(payload, `${process.env.SECRET_JWT_API_KEY}`);
    return res.status(200).json({ token, usertype });
  } catch(err) {
    return res.status(500).json({ error: 'Internal Server Error: ' + err });
  }
};