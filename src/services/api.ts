import axios from 'axios';
import { NewsArticle, CacheStatus, MinistryUpdate, BibleVerse, PrayerRequest, ChurchEvent } from '../types';

// API Configuration - using CORS proxies like crypto-news

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

// News API - using CORS proxies like crypto-news
export const getNews = async (): Promise<NewsArticle[]> => {
  try {
    console.log('🚀 Fetching Christian news from RSS feeds...');
    
    // Multiple CORS proxies to try (same as crypto-news)
    const CORS_PROXIES = [
      'https://api.allorigins.win/raw?url=',
      'https://corsproxy.io/?',
      'https://thingproxy.freeboard.io/fetch/',
      'https://cors-anywhere.herokuapp.com/',
      'https://api.codetabs.com/v1/proxy?quest=',
      'https://cors.bridged.cc/',
      'https://cors.eu.org/'
    ];
    
    const newsPromises = CHRISTIAN_RSS_FEEDS.map(async (feed, feedIndex) => {
      // Try CORS proxies for each feed
      for (const proxy of CORS_PROXIES) {
        try {
          console.log(`Trying ${feed.name} with proxy: ${proxy}`);
          const response = await axios.get(`${proxy}${encodeURIComponent(feed.url)}`, {
            timeout: 10000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          });
          
          if (response.data && response.data.length > 0) {
            const parsedNews = parseRSSFeed(response.data, feed, feedIndex);
            if (parsedNews.length > 0) {
              console.log(`✅ Successfully fetched RSS feed: ${feed.name} (${parsedNews.length} articles)`);
              return parsedNews;
            }
          }
        } catch (error: any) {
          console.log(`❌ Failed to fetch ${feed.name} with proxy ${proxy}:`, error.message);
          continue;
        }
      }
      
      console.log(`❌ All proxies failed for RSS feed: ${feed.name}`);
      return [];
    });

    const results = await Promise.all(newsPromises);
    const allArticles = results.flat().sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    
    console.log(`📊 Total RSS articles fetched: ${allArticles.length}`);
    
    if (allArticles.length > 0) {
      return allArticles;
    }
    
    console.log('⚠️ All RSS methods failed, using enhanced sample data');
    return getEnhancedSampleNews();
  } catch (error) {
    console.error('Error fetching news:', error);
    return getEnhancedSampleNews();
  }
};

// Parse RSS XML to NewsArticle objects (like crypto-news)
const parseRSSFeed = (xmlString: string, feed: any, feedIndex: number): NewsArticle[] => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    if (!xmlDoc) {
      console.log(`❌ Failed to parse XML for ${feed.name}`);
      return [];
    }
    
    const items = xmlDoc.querySelectorAll('item');
    const articles: NewsArticle[] = [];
    
    items.forEach((item, index) => {
      try {
        const title = item.querySelector('title')?.textContent?.trim() || '';
        const description = item.querySelector('description')?.textContent?.trim() || 
                          item.querySelector('content\\:encoded')?.textContent?.trim() || '';
        const link = item.querySelector('link')?.textContent?.trim() || '';
        const pubDate = item.querySelector('pubDate')?.textContent?.trim() || new Date().toISOString();
        const author = item.querySelector('author')?.textContent?.trim() || 
                      item.querySelector('dc\\:creator')?.textContent?.trim() || feed.name;
        
        // Clean up description (remove HTML tags)
        const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 200);
        
        if (title && link) {
          articles.push({
            id: `rss-${feedIndex}-${index}`,
            title: title,
            description: cleanDescription,
            link: link,
            pubDate: pubDate,
            source: author,
            category: feed.category,
            imageUrl: `https://via.placeholder.com/400x250/059669/FFFFFF?text=${encodeURIComponent(feed.name)}`
          });
        }
      } catch (error) {
        console.log(`❌ Failed to parse item ${index} from ${feed.name}:`, error);
      }
    });
    
    return articles;
  } catch (error) {
    console.error(`❌ Failed to parse RSS feed ${feed.name}:`, error);
    return [];
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