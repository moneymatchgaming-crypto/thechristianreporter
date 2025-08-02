import axios from 'axios';
import { NewsArticle, CacheStatus, MinistryUpdate, BibleVerse, PrayerRequest, ChurchEvent } from '../types';

// API Configuration - using external APIs directly like crypto-news
const RSS2JSON_API_KEY = import.meta.env.VITE_RSS2JSON_API_KEY || 'YOUR_API_KEY_HERE';

// Christian news RSS feeds
const CHRISTIAN_RSS_FEEDS = [
  'https://relevantmagazine.com/feed/',
  'https://www.christianitytoday.com/rss',
  'https://www.christianpost.com/rss',
  'https://www.worthynews.com/feed',
  'https://www.catholicnewsagency.com/rss/news.xml',
  'https://www.thegospelcoalition.org/feed/',
  'https://blog.compassion.com/feed/',
  'https://proverbs31.org/feed/',
  'https://www.ligonier.org/feed/',
  'https://www.cmda.org/feed/'
];

const api = axios.create({
  timeout: 10000,
});

// News API - using RSS2JSON like crypto-news
export const getNews = async (): Promise<NewsArticle[]> => {
  try {
    console.log('🚀 Fetching Christian news from RSS feeds...');
    
    if (RSS2JSON_API_KEY === 'YOUR_API_KEY_HERE') {
      console.log('⚠️ RSS2JSON API key not configured. Using sample data.');
      return getSampleNews();
    }
    
    // Fetch from multiple RSS feeds
    const feedPromises = CHRISTIAN_RSS_FEEDS.map(async (feedUrl, index) => {
      try {
        const response = await axios.get('https://api.rss2json.com/v1/api.json', {
          params: {
            rss_url: feedUrl,
            api_key: RSS2JSON_API_KEY,
            count: 10
          },
          timeout: 10000
        });
        
        if (response.data && response.data.status === 'ok' && response.data.items) {
          return response.data.items.map((item: any, itemIndex: number) => ({
            id: `rss-${index}-${itemIndex}`,
            title: item.title,
            description: item.description,
            link: item.link,
            pubDate: item.pubDate,
            source: item.author || 'Christian News',
            category: 'christian',
            imageUrl: item.thumbnail || 'https://via.placeholder.com/400x250/059669/FFFFFF?text=News'
          }));
        }
      } catch (error) {
        console.log(`Failed to fetch ${feedUrl}:`, error);
      }
      return [];
    });
    
    const results = await Promise.allSettled(feedPromises);
    const allArticles = results
      .filter(result => result.status === 'fulfilled')
      .flatMap(result => (result as PromiseFulfilledResult<NewsArticle[]>).value)
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    
    console.log(`📰 Fetched ${allArticles.length} articles from RSS feeds`);
    return allArticles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return getSampleNews();
  }
};

// Sample news data for fallback
const getSampleNews = (): NewsArticle[] => [
  {
    id: '1',
    title: 'Christian Community Rallies for Local Family',
    description: 'Local church members come together to support family in need.',
    link: '#',
    pubDate: new Date().toISOString(),
    source: 'Christian News Network',
    category: 'community',
    imageUrl: 'https://via.placeholder.com/400x250/059669/FFFFFF?text=Community'
  },
  {
    id: '2',
    title: 'New Bible Study Program Launches',
    description: 'Innovative approach to scripture study gains popularity.',
    link: '#',
    pubDate: new Date(Date.now() - 86400000).toISOString(),
    source: 'Faith Today',
    category: 'ministry',
    imageUrl: 'https://via.placeholder.com/400x250/7C3AED/FFFFFF?text=Bible+Study'
  },
  {
    id: '3',
    title: 'Mission Trip Success Story',
    description: 'Youth group returns from transformative service trip.',
    link: '#',
    pubDate: new Date(Date.now() - 172800000).toISOString(),
    source: 'Christian Outreach',
    category: 'missions',
    imageUrl: 'https://via.placeholder.com/400x250/DC2626/FFFFFF?text=Missions'
  }
];

export const getCacheStatus = async (): Promise<CacheStatus | null> => {
  try {
    return {
      lastUpdated: new Date().toISOString(),
      totalArticles: 25,
      sourcesCount: 10,
      nextUpdate: new Date(Date.now() + 300000).toISOString()
    };
  } catch (error) {
    console.error('Error fetching cache status:', error);
    return null;
  }
};

// Bible Verse API - using external Bible API
export const getDailyVerse = async (): Promise<BibleVerse | null> => {
  try {
    // Try Bible API
    const response = await axios.get('https://labs.bible.org/api/?passage=random&type=json');
    
    if (response.data && response.data.length > 0) {
      const verse = response.data[0];
      return {
        reference: verse.bookname + ' ' + verse.chapter + ':' + verse.verse,
        text: verse.text,
        translation: 'NIV'
      };
    }
  } catch (error) {
    console.error('Error fetching daily verse:', error);
  }
  
  // Fallback verse
  return {
    reference: 'John 3:16',
    text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    translation: 'NIV'
  };
};

export const refreshDailyVerse = async (): Promise<BibleVerse | null> => {
  return getDailyVerse();
};

// Prayer Requests API - sample data
export const getPrayerRequests = async (): Promise<PrayerRequest[]> => {
  return [
    {
      id: '1',
      title: 'Prayer for Healing',
      description: 'Please pray for Sarah who is recovering from surgery.',
      category: 'health',
      urgency: 'high',
      date: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Mission Team Safety',
      description: 'Praying for our mission team serving in Guatemala.',
      category: 'missions',
      urgency: 'medium',
      date: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '3',
      title: 'Family Reconciliation',
      description: 'Praying for healing in family relationships.',
      category: 'family',
      urgency: 'medium',
      date: new Date(Date.now() - 172800000).toISOString()
    }
  ];
};

// Ministry Updates API - sample data
export const getMinistryUpdates = async (): Promise<MinistryUpdate[]> => {
  return [
    {
      id: '1',
      title: 'New Youth Ministry Program',
      description: 'Launching a new program for teenagers.',
      ministry: 'Youth Ministry',
      date: new Date().toISOString(),
      impact: 'local',
      category: 'education'
    }
  ];
};

// Church Events API - sample data
export const getChurchEvents = async (): Promise<ChurchEvent[]> => {
  return [
    {
      id: '1',
      title: 'Sunday Service',
      description: 'Weekly worship service',
      date: new Date().toISOString(),
      location: 'Main Sanctuary',
      church: 'First Christian Church',
      type: 'service'
    }
  ];
};

// Health check
export const checkHealth = async (): Promise<boolean> => {
  return true;
};

export default api; 