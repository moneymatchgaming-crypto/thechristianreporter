import axios from 'axios';
import { NewsArticle, CacheStatus, MinistryUpdate, BibleVerse, PrayerRequest, ChurchEvent } from '../types';

// API Configuration - using external APIs directly like crypto-news
const RSS2JSON_API_KEY = import.meta.env.VITE_RSS2JSON_API_KEY || 'YOUR_API_KEY_HERE';

// Christian news RSS feeds - 40+ sources from local copy
const CHRISTIAN_RSS_FEEDS = [
  // Major News Sources
  { name: 'Relevant Magazine', url: 'https://relevantmagazine.com/feed/', category: 'youth' },
  { name: 'Christianity Today', url: 'https://www.christianitytoday.com/rss', category: 'church' },
  { name: 'Christian Post', url: 'https://www.christianpost.com/rss', category: 'news' },
  { name: 'Worthy News', url: 'https://www.worthynews.com/feed', category: 'news' },
  { name: 'Catholic News Agency', url: 'https://www.catholicnewsagency.com/rss/news.xml', category: 'catholic' },
  { name: 'Gospel Coalition', url: 'https://www.thegospelcoalition.org/feed/', category: 'theology' },
  { name: 'Compassion International', url: 'https://blog.compassion.com/feed/', category: 'missions' },
  { name: 'Proverbs 31 Ministries', url: 'https://proverbs31.org/feed/', category: 'women' },
  { name: 'Ligonier Ministries', url: 'https://www.ligonier.org/feed/', category: 'theology' },
  { name: 'Christian Medical & Dental Associations', url: 'https://www.cmda.org/feed/', category: 'professionals' },
  { name: 'Ann Voskamp', url: 'https://www.aholyexperience.com/feed/', category: 'women' },
  // Faith & Ministry Sources
  { name: 'Answers in Genesis', url: 'https://www.answersingenesis.org/dailycontent.xml', category: 'apologetics' },
  { name: 'iBelieve', url: 'https://www.ibelieve.com/rss', category: 'faith' },
  { name: 'Christianity.com', url: 'https://www.christianity.com/rss', category: 'faith' },
  { name: 'Red Letter Christians', url: 'https://www.redletterchristians.org/feed', category: 'social-justice' },
  { name: 'Life Stream', url: 'https://www.lifestream.org/feed', category: 'ministry' },
  { name: 'Charisma News', url: 'https://www.charismanews.com/feed', category: 'ministry' },
  { name: 'Christian Headlines', url: 'https://www.christianheadlines.com/feed', category: 'church' },
  { name: 'Bible Gateway', url: 'https://www.biblegateway.com/blog/feed/', category: 'ministry' },
  { name: 'The Christian Century', url: 'https://www.christiancentury.org/rss.xml', category: 'church' },
  { name: 'CCM Magazine', url: 'https://www.ccmmagazine.com/feed/', category: 'music' },
  // Mission Organizations
  { name: 'Focus on the Family', url: 'https://www.focusonthefamily.com/feed/', category: 'family' },
  { name: 'Samaritan\'s Purse', url: 'https://www.samaritanspurse.org/feed/', category: 'missions' },
  { name: 'World Vision', url: 'https://www.worldvision.org/feed', category: 'missions' },
  { name: 'International Mission Board', url: 'https://www.imb.org/feed/', category: 'missions' },
  { name: 'North American Mission Board', url: 'https://www.namb.net/feed/', category: 'church' },
  { name: 'Southern Baptist Convention', url: 'https://www.sbc.net/feed/', category: 'church' },
  { name: 'YWAM', url: 'https://www.ywam.org/feed/', category: 'missions' },
  { name: 'Navigators', url: 'https://www.navigators.org/feed/', category: 'ministry' },
  { name: 'Athletes in Action', url: 'https://www.athletesinaction.org/feed/', category: 'sports' },
  // Denominational Sources
  { name: 'Mennonite Church USA', url: 'https://www.mennoniteusa.org/feed/', category: 'church' },
  { name: 'Christian and Missionary Alliance', url: 'https://www.cmalliance.org/feed/', category: 'church' },
  { name: 'Wesleyan Church', url: 'https://www.wesleyan.org/feed', category: 'church' },
  // Women's Ministries
  { name: 'Lysa TerKeurst', url: 'https://lysaterkeurst.com/feed/', category: 'women' },
  { name: 'Priscilla Shirer', url: 'https://goingbeyond.com/feed/', category: 'women' },
  { name: 'Kay Arthur', url: 'https://www.precept.org/feed/', category: 'women' },
  { name: 'She Reads Truth', url: 'https://shereadstruth.com/feed/', category: 'women' },
  { name: 'Moms in Prayer', url: 'https://www.momsinprayer.org/feed/', category: 'women' },
  { name: 'Mothers of Preschoolers', url: 'https://www.mops.org/feed/', category: 'women' },
  // Professional Organizations
  { name: 'Christian Business Men\'s Connection', url: 'https://www.cbmc.com/feed/', category: 'professionals' },
  { name: 'Christian Apologetics & Research Ministry', url: 'https://carm.org/feed/', category: 'apologetics' },
  { name: 'Christianity Today Leadership', url: 'https://www.christianitytoday.com/leaders/feed', category: 'ministry' },
  { name: 'Christianity Today Women', url: 'https://www.christianitytoday.com/women/feed', category: 'family' },
  { name: 'Christianity Today Pastors', url: 'https://www.christianitytoday.com/pastors/feed', category: 'ministry' },
  { name: 'Christianity Today Church', url: 'https://www.christianitytoday.com/church/feed', category: 'church' },
  { name: 'Christianity Today Culture', url: 'https://www.christianitytoday.com/culture/feed', category: 'culture' },
  { name: 'Christianity Today Global', url: 'https://www.christianitytoday.com/global/feed', category: 'missions' }
];

const api = axios.create({
  timeout: 10000,
});

// News API - using RSS2JSON like crypto-news
export const getNews = async (): Promise<NewsArticle[]> => {
  try {
    console.log('🚀 Fetching Christian news from RSS feeds...');
    
    // First try RSS2JSON with API key
    if (RSS2JSON_API_KEY !== 'YOUR_API_KEY_HERE') {
      console.log('🔑 Using RSS2JSON API with key...');
      
      // Fetch from multiple RSS feeds
      const feedPromises = CHRISTIAN_RSS_FEEDS.map(async (feed, index) => {
        try {
          const response = await axios.get('https://api.rss2json.com/v1/api.json', {
            params: {
              rss_url: feed.url,
              api_key: RSS2JSON_API_KEY,
              count: 10
            },
            timeout: 10000
          });
          
          if (response.data && response.data.status === 'ok' && response.data.items) {
            console.log(`✅ Successfully fetched from ${feed.name}: ${response.data.items.length} articles`);
            return response.data.items.map((item: any, itemIndex: number) => ({
              id: `rss-${index}-${itemIndex}`,
              title: item.title,
              description: item.description,
              link: item.link,
              pubDate: item.pubDate,
              source: item.author || feed.name,
              category: feed.category,
              imageUrl: item.thumbnail || `https://via.placeholder.com/400x250/059669/FFFFFF?text=${encodeURIComponent(feed.name)}`
            }));
          }
        } catch (error) {
          console.log(`❌ Failed to fetch ${feed.name}:`, error);
        }
        return [];
      });
      
      const results = await Promise.allSettled(feedPromises);
      const allArticles = results
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => (result as PromiseFulfilledResult<NewsArticle[]>).value)
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      
      if (allArticles.length > 0) {
        console.log(`📰 Fetched ${allArticles.length} articles from RSS feeds`);
        return allArticles;
      }
    }
    
    // Fallback: Try RSS2JSON without API key (limited but works)
    console.log('🔄 Trying RSS2JSON without API key...');
    try {
      const response = await axios.get('https://api.rss2json.com/v1/api.json', {
        params: {
          rss_url: 'https://relevantmagazine.com/feed/',
          count: 5
        },
        timeout: 10000
      });
      
      if (response.data && response.data.status === 'ok' && response.data.items) {
        console.log(`✅ Successfully fetched from Relevant Magazine: ${response.data.items.length} articles`);
        return response.data.items.map((item: any, index: number) => ({
          id: `rss-fallback-${index}`,
          title: item.title,
          description: item.description,
          link: item.link,
          pubDate: item.pubDate,
          source: item.author || 'Relevant Magazine',
          category: 'christian',
          imageUrl: item.thumbnail || 'https://via.placeholder.com/400x250/059669/FFFFFF?text=News'
        }));
      }
    } catch (error) {
      console.log('❌ RSS2JSON without API key also failed:', error);
    }
    
    console.log('⚠️ All RSS methods failed, using sample data');
    return getSampleNews();
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

// Bible Verse API - Daily verse (same verse all day)
export const getDailyVerse = async (): Promise<BibleVerse | null> => {
  // Popular verses for daily rotation
  const popularVerses = [
    'john+3:16',
    'philippians+4:13',
    'jeremiah+29:11',
    'romans+8:28',
    'psalm+23:1',
    'matthew+28:19-20',
    'galatians+5:22-23',
    'proverbs+3:5-6',
    'isaiah+40:31',
    'psalm+46:10',
    'colossians+3:23',
    'ephesians+2:8-9',
    '2+timothy+1:7',
    'james+1:5',
    '1+corinthians+13:4-7',
    'psalm+119:105',
    'matthew+11:28-30',
    'john+14:6',
    'acts+1:8',
    'revelation+3:20'
  ];

  // Get today's date to select a consistent verse for the day
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const selectedVerse = popularVerses[dayOfYear % popularVerses.length];

  try {
    // Try Bible-API.com first (free, reliable)
    const response = await axios.get(`https://bible-api.com/${selectedVerse}`, {
      timeout: 8000,
      headers: {
        'User-Agent': 'The Christian Reporter/1.0'
      }
    });

    if (response.data && response.data.text) {
      return {
        reference: response.data.reference,
        text: response.data.text,
        translation: response.data.translation_name || 'KJV'
      };
    }
  } catch (error) {
    console.log('Bible-API.com failed, trying alternative...');
  }

  // Try OpenBible.info as fallback
  try {
    const response = await axios.get('https://labs.bible.org/api/?passage=random&format=json&type=verse', {
      timeout: 8000,
      headers: {
        'User-Agent': 'The Christian Reporter/1.0'
      }
    });

    if (response.data && response.data.length > 0) {
      const verse = response.data[0];
      return {
        reference: verse.bookname + ' ' + verse.chapter + ':' + verse.verse,
        text: verse.text,
        translation: 'NIV'
      };
    }
  } catch (error) {
    console.log('OpenBible.info failed, using fallback verses');
  }
  
  // Fallback verse - same for the day
  const fallbackVerses = [
    {
      reference: 'John 3:16',
      text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
      translation: 'NIV'
    },
    {
      reference: 'Philippians 4:13',
      text: 'I can do all things through Christ who strengthens me.',
      translation: 'NKJV'
    },
    {
      reference: 'Jeremiah 29:11',
      text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.',
      translation: 'NIV'
    },
    {
      reference: 'Romans 8:28',
      text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
      translation: 'NIV'
    },
    {
      reference: 'Psalm 23:1',
      text: 'The Lord is my shepherd, I shall not want.',
      translation: 'NIV'
    }
  ];

  return fallbackVerses[dayOfYear % fallbackVerses.length];
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