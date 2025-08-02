export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Sample Bible verse data matching the frontend expectations
    const verse = {
      reference: 'John 3:16',
      text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
      translation: 'NIV',
      date: new Date().toISOString().split('T')[0]
    };

    // Return the verse directly (not wrapped in an object)
    res.status(200).json(verse);
  } catch (error) {
    console.error('Error in daily verse API:', error);
    res.status(500).json({ error: 'Failed to fetch daily verse' });
  }
} 