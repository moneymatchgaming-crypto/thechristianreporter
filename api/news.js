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
    // Sample Christian news data
    const articles = [
      {
        id: '1',
        title: 'Christian Community Rallies for Local Family',
        description: 'Local church members come together to support family in need.',
        source: 'Christian News Network',
        url: '#',
        publishedAt: new Date().toISOString(),
        category: 'community'
      },
      {
        id: '2',
        title: 'New Bible Study Program Launches',
        description: 'Innovative approach to scripture study gains popularity.',
        source: 'Faith Today',
        url: '#',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        category: 'ministry'
      },
      {
        id: '3',
        title: 'Mission Trip Success Story',
        description: 'Youth group returns from transformative service trip.',
        source: 'Christian Outreach',
        url: '#',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        category: 'missions'
      }
    ];

    res.status(200).json({ articles });
  } catch (error) {
    console.error('Error in news API:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
} 