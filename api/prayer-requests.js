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
    // Sample prayer requests data
    const requests = [
      {
        id: '1',
        title: 'Prayer for Healing',
        description: 'Please pray for Sarah who is recovering from surgery.',
        category: 'health',
        urgency: 'high',
        date: new Date().toISOString(),
        anonymous: false,
        prayerCount: 12
      },
      {
        id: '2',
        title: 'Mission Team Safety',
        description: 'Praying for our mission team serving in Guatemala.',
        category: 'missions',
        urgency: 'medium',
        date: new Date(Date.now() - 86400000).toISOString(),
        anonymous: false,
        prayerCount: 8
      },
      {
        id: '3',
        title: 'Family Reconciliation',
        description: 'Praying for healing in family relationships.',
        category: 'family',
        urgency: 'medium',
        date: new Date(Date.now() - 172800000).toISOString(),
        anonymous: true,
        prayerCount: 15
      }
    ];

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error in prayer requests API:', error);
    res.status(500).json({ error: 'Failed to fetch prayer requests' });
  }
} 