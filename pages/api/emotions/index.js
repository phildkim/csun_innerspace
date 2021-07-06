import { Emotion } from '@/mongoose/models';

async function getEmotions(req, res) {
  const data = await Emotion.find({});
  res.status(200).json({ result: data });
};

async function postEmotions(req, res) {
  const data = await Emotion.create(req.body);
  res.status(200).json({ result: data });
};

export default async function (req, res) {
  switch (req.method) {
    case 'GET':
      return await getEmotions(req, res);
    case 'POST':
      return await postEmotions(req, res);
    default:
      return res.status(400).json({ error: 'unsupported_method' });
  }
};
