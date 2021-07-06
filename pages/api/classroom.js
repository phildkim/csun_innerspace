import { User, Result } from '@/mongoose/models';

export default async function (req, res) {
  if (req.method !== 'GET')
    return res.status(400).json({ error: 'unsupported_method' });
  try {
    const students = await User.find({ usertype: 'student' }).lean();
    await Promise.all(
      students.map(async student => {
        const count = await Result.countDocuments({ user: student._id });
        student.complete = (count || 0);
      })
    );
    return res.status(200).json({ result: students });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error: ' + err });
  }
};
