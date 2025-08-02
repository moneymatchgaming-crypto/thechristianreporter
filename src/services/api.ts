import axios from 'axios';
import { NewsArticle, CacheStatus, MinistryUpdate, BibleVerse, PrayerRequest, ChurchEvent } from '../types';

// API Configuration - using backend server like crypto-news
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// News API - using backend server like crypto-news
export const getNews = async (): Promise<NewsArticle[]> => {
  try {
    console.log('🚀 Fetching Christian news from backend...');
    
    // Use backend server like crypto-news
    const response = await api.get('/api/news');
    
    if (response.data && response.data.articles) {
      console.log(`📰 Fetched ${response.data.articles.length} articles from backend`);
      return response.data.articles;
    }
    
    console.log('⚠️ Backend failed, using enhanced sample data');
    return getEnhancedSampleNews();
  } catch (error) {
    console.error('Error fetching news from backend:', error);
    return getEnhancedSampleNews();
  }
};



// Enhanced sample news data for fallback with more variety
const getEnhancedSampleNews = (): NewsArticle[] => [
  {
    id: '1',
    title: 'Christian Community Rallies for Local Family',
    description: 'Local church members come together to support family in need during difficult times.',
    link: '#',
    pubDate: new Date().toISOString(),
    source: 'Relevant Magazine',
    category: 'community',
    imageUrl: 'https://via.placeholder.com/400x250/059669/FFFFFF?text=Relevant+Magazine'
  },
  {
    id: '2',
    title: 'New Bible Study Program Launches',
    description: 'Innovative approach to scripture study gains popularity among young adults.',
    link: '#',
    pubDate: new Date(Date.now() - 86400000).toISOString(),
    source: 'Christianity Today',
    category: 'ministry',
    imageUrl: 'https://via.placeholder.com/400x250/7C3AED/FFFFFF?text=Christianity+Today'
  },
  {
    id: '3',
    title: 'Mission Trip Success Story',
    description: 'Youth group returns from transformative service trip to Guatemala.',
    link: '#',
    pubDate: new Date(Date.now() - 172800000).toISOString(),
    source: 'Christian Post',
    category: 'missions',
    imageUrl: 'https://via.placeholder.com/400x250/DC2626/FFFFFF?text=Christian+Post'
  },
  {
    id: '4',
    title: 'Worship Music Revival Sweeps Churches',
    description: 'Contemporary worship music brings new energy to traditional congregations.',
    link: '#',
    pubDate: new Date(Date.now() - 259200000).toISOString(),
    source: 'Gospel Coalition',
    category: 'worship',
    imageUrl: 'https://via.placeholder.com/400x250/059669/FFFFFF?text=Gospel+Coalition'
  },
  {
    id: '5',
    title: 'Family Ministry Programs Expand',
    description: 'Churches across the country are expanding their family ministry programs.',
    link: '#',
    pubDate: new Date(Date.now() - 345600000).toISOString(),
    source: 'Focus on the Family',
    category: 'family',
    imageUrl: 'https://via.placeholder.com/400x250/7C3AED/FFFFFF?text=Focus+on+Family'
  },
  {
    id: '6',
    title: 'Christian Apologetics Conference Draws Thousands',
    description: 'Annual apologetics conference brings together leading Christian thinkers.',
    link: '#',
    pubDate: new Date(Date.now() - 432000000).toISOString(),
    source: 'Charisma News',
    category: 'apologetics',
    imageUrl: 'https://via.placeholder.com/400x250/DC2626/FFFFFF?text=Charisma+News'
  },
  {
    id: '7',
    title: 'Women\'s Ministry Leadership Summit',
    description: 'Women leaders gather to discuss ministry challenges and opportunities.',
    link: '#',
    pubDate: new Date(Date.now() - 518400000).toISOString(),
    source: 'Proverbs 31 Ministries',
    category: 'women',
    imageUrl: 'https://via.placeholder.com/400x250/059669/FFFFFF?text=Proverbs+31'
  },
  {
    id: '8',
    title: 'Youth Ministry Innovation Award',
    description: 'Innovative youth ministry program receives national recognition.',
    link: '#',
    pubDate: new Date(Date.now() - 604800000).toISOString(),
    source: 'Christian Headlines',
    category: 'youth',
    imageUrl: 'https://via.placeholder.com/400x250/7C3AED/FFFFFF?text=Christian+Headlines'
  },
  {
    id: '9',
    title: 'International Mission Partnership',
    description: 'Churches partner for global mission initiatives in developing nations.',
    link: '#',
    pubDate: new Date(Date.now() - 691200000).toISOString(),
    source: 'World Vision',
    category: 'missions',
    imageUrl: 'https://via.placeholder.com/400x250/DC2626/FFFFFF?text=World+Vision'
  },
  {
    id: '10',
    title: 'Theological Education Online',
    description: 'Online theological education programs see record enrollment.',
    link: '#',
    pubDate: new Date(Date.now() - 777600000).toISOString(),
    source: 'Ligonier Ministries',
    category: 'theology',
    imageUrl: 'https://via.placeholder.com/400x250/059669/FFFFFF?text=Ligonier'
  },
  {
    id: '11',
    title: 'Christian Business Network Grows',
    description: 'Christian business professionals form new networking groups.',
    link: '#',
    pubDate: new Date(Date.now() - 864000000).toISOString(),
    source: 'Christian Business Men\'s Connection',
    category: 'professionals',
    imageUrl: 'https://via.placeholder.com/400x250/7C3AED/FFFFFF?text=CBMC'
  },
  {
    id: '12',
    title: 'Church Planting Movement',
    description: 'New church planting movement spreads across urban areas.',
    link: '#',
    pubDate: new Date(Date.now() - 950400000).toISOString(),
    source: 'North American Mission Board',
    category: 'church',
    imageUrl: 'https://via.placeholder.com/400x250/DC2626/FFFFFF?text=NAMB'
  }
];

export const getCacheStatus = async (): Promise<CacheStatus | null> => {
  try {
    const response = await api.get('/api/cache-status');
    return response.data;
  } catch (error) {
    console.error('Error fetching cache status:', error);
    return null;
  }
};

// Bible Verse API - Daily verse (same verse all day)
export const getDailyVerse = async (): Promise<BibleVerse | null> => {
  try {
    const response = await api.get('/api/daily-verse');
    return response.data;
  } catch (error) {
    console.error('Error fetching daily verse:', error);
    return null;
  }
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