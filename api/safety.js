export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing on the server' });
  }

  const prompt = `Tell me about this location: ${address}.
Include: general safety information, notable recent events you know of (good and bad), the nearest police station, and the nearest hospital.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return res.status(500).json({ error: data.error?.message || 'Gemini request failed' });
    }

    const aiText =
      data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ||
      'No details available for this location.';

    return res.status(200).json({ result: aiText });
  } catch (error) {
    console.error('Gemini Error:', error);
    return res.status(500).json({ error: 'Failed to connect to Gemini.' });
  }
}
