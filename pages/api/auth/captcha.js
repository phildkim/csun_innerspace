
export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(400).json({ error: 'unsupported_method' });
  if (!req.body)
    return res.status(400).json({ error: 'invalid_body' });

  try {
    const { token } = req.body;
    if (!token)
      return res.status(400).json({ error: 'Captcha Token Missing' });
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_GOOGLE_API_KEY}&response=${token}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      }, method: 'POST',
    });
    const validation = await response.json();
    if (!validation.success)
      return res.status(400).json({ error: 'Invalid Captcha' });
    return res.status(200).json();
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error: ' + err });
  }
};