
export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(400).json({ error: 'unsupported_method' });
  if (!req.body)
    return res.status(400).json({ error: 'invalid_body' });
  try {
    const { token } = req.body;
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      method: 'POST',
      body: `secret=${process.env.SECRET_GOOGLE_API_KEY}&response=${token}`
    }).then(res => res.json())
      .then(json => json.success)
      .catch(err => {
        throw new Error(`Error in Google Siteverify API. ${err.message}`)
      });
    if(token === null || !token) {
      throw new Error(`Please try again.`)
    }
    console.log('SUCCESS');
    return res.status(200).json({ result: response });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error: ' + err });
  }
};