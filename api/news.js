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
    // Sample Christian news data matching the frontend expectations
    const articles = [
      {
        id: '1',
        title: 'Christian Community Rallies for Local Family',
        description: 'Local church members come together to support family in need.',
        source: 'Christian News Network',
        url: '#',
        publishedAt: new Date().toISOString(),
        category: 'community',
        image: 'https://via.placeholder.com/400x250/059669/FFFFFF?text=Community'
      },
      {
        id: '2',
        title: 'New Bible Study Program Launches',
        description: 'Innovative approach to scripture study gains popularity.',
        source: 'Faith Today',
        url: '#',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        category: 'ministry',
        image: 'https://via.placeholder.com/400x250/7C3AED/FFFFFF?text=Bible+Study'
      },
      {
        id: '3',
        title: 'Mission Trip Success Story',
        description: 'Youth group returns from transformative service trip.',
        source: 'Christian Outreach',
        url: '#',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        category: 'missions',
        image: 'https://via.placeholder.com/400x250/DC2626/FFFFFF?text=Missions'
      },
      {
        id: '4',
        title: 'Church Hosts Community Outreach Event',
        description: 'Local congregation serves over 500 families in need.',
        source: 'Christian Community News',
        url: '#',
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        category: 'outreach',
        image: 'https://via.placeholder.com/400x250/059669/FFFFFF?text=Outreach'
      },
      {
        id: '5',
        title: 'Youth Ministry Grows by 40%',
        description: 'New programs attract young people to faith community.',
        source: 'Youth Ministry Today',
        url: '#',
        publishedAt: new Date(Date.now() - 345600000).toISOString(),
        category: 'youth',
        image: 'https://via.placeholder.com/400x250/7C3AED/FFFFFF?text=Youth'
      }
    ];

    // Return the data in the format the frontend expects
    res.status(200).json({ articles });
  } catch (error) {
    console.error('Error in news API:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
} 