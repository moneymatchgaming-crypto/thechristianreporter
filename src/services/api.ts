import axios from 'axios'
import { NewsArticle, BibleVerse, CacheStatus } from '../types'

// API Configuration - using RSS2JSON like crypto-news
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

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

// News API - using RSS2JSON like crypto-news
export const getNews = async (): Promise<NewsArticle[]> => {
  console.log('🚀 Fetching Christian news from RSS feeds...');
  
  try {
    // Try RSS2JSON API with API key (like crypto-news)
    const RSS2JSON_API_KEY = import.meta.env.VITE_RSS2JSON_API_KEY || 'YOUR_API_KEY_HERE';
    
    console.log('🔑 RSS2JSON API Key status:', RSS2JSON_API_KEY === 'YOUR_API_KEY_HERE' ? 'NOT CONFIGURED' : 'CONFIGURED');
    
    if (RSS2JSON_API_KEY !== 'YOUR_API_KEY_HERE') {
      // Use RSS2JSON API (like crypto-news)
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
            return parseRSSFromJSON(response.data, feed, index);
          }
        } catch (error) {
          console.log(`Failed to fetch ${feed.name}:`, error.message);
        }
        return [];
      });
      
      const results = await Promise.allSettled(feedPromises);
      const allArticles = results
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => (result as PromiseFulfilledResult<NewsArticle[]>).value)
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      
      if (allArticles.length > 0) {
        console.log(`📰 Fetched ${allArticles.length} articles from RSS2JSON`);
        return allArticles;
      }
    } else {
      console.log('⚠️ RSS2JSON API key not configured. Please add VITE_RSS2JSON_API_KEY to your environment variables.');
    }
    
  } catch (error) {
    console.log('RSS2JSON API failed:', error.message);
  }
  
  // Fallback to CORS proxies (like crypto-news)
  try {
    console.log('🔄 Falling back to CORS proxies...');
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
      
      // If CORS proxies fail, try local server (like crypto-news)
      try {
        console.log(`Trying local server for: ${feed.name}`);
        const response = await axios.get(`${API_BASE_URL}/api/rss/${feedIndex}`, {
          timeout: 10000
        });
        
        if (response.data && response.data.articles) {
          console.log(`✅ Successfully fetched via local server: ${feed.name} (${response.data.articles.length} articles)`);
          return response.data.articles;
        }
      } catch (error: any) {
        console.log(`❌ Local server also failed for: ${feed.name}`, error.message);
      }
      
      console.log(`❌ All methods failed for RSS feed: ${feed.name}`);
      return [];
    });

    const results = await Promise.all(newsPromises);
    const allArticles = results.flat().sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    
    console.log(`📊 Total RSS articles fetched: ${allArticles.length}`);
    
    if (allArticles.length > 0) {
      return allArticles;
    }
    
  } catch (error) {
    console.error('Error fetching news:', error);
  }
  
  console.log('⚠️ All methods failed, using enhanced sample data');
  return getEnhancedSampleNews();
};

// Parse RSS JSON (from RSS2JSON API) to NewsArticle objects (like crypto-news)
const parseRSSFromJSON = (jsonData: any, feed: any, feedIndex: number): NewsArticle[] => {
  try {
    // Check if this is an error response from RSS2JSON
    if (jsonData.status === 'error') {
      console.log(`RSS2JSON error for feed ${feed.name}:`, jsonData.message);
      return [];
    }
    
    // RSS2JSON API returns items directly in the items array
    const items = jsonData.items || [];
    const articles: NewsArticle[] = [];
    
    items.forEach((item: any, index: number) => {
      try {
        const title = item.title?.trim() || '';
        const description = item.description?.trim() || '';
        const link = item.link?.trim() || '';
        const pubDate = item.pubDate || item.published || new Date().toISOString();
        const author = item.author || feed.name;
        
        // Clean up description (remove HTML tags)
        const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 200);
        
        if (title && link) {
          articles.push({
            id: `rss2json-${feedIndex}-${index}`,
            title: title,
            description: cleanDescription,
            link: link,
            pubDate: pubDate,
            source: author,
            category: feed.category,
            imageUrl: extractImageFromContent(description) || getPlaceholderImage(feed.category)
          });
        }
      } catch (error) {
        console.log(`❌ Failed to parse item ${index} from ${feed.name}:`, error);
      }
    });
    
    return articles;
  } catch (error) {
    console.error(`❌ Failed to parse RSS2JSON feed ${feed.name}:`, error);
    return [];
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
            imageUrl: extractImageFromContent(description) || getPlaceholderImage(feed.category)
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

// Extract image from content (like crypto-news)
const extractImageFromContent = (content: string): string | null => {
  if (!content) return null;
  
  // Try to find img tags with various quote styles
  const imgMatch = content.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  if (imgMatch) return imgMatch[1];
  
  // Try to find background images
  const bgMatch = content.match(/background-image:\s*url\(['"]?([^'")\s]+)['"]?\)/i);
  if (bgMatch) return bgMatch[1];
  
  // Try to find data-src (lazy loading)
  const dataSrcMatch = content.match(/<img[^>]+data-src=["']([^"'>]+)["']/i);
  if (dataSrcMatch) return dataSrcMatch[1];
  
  // Try to find srcset (responsive images)
  const srcsetMatch = content.match(/<img[^>]+srcset=["']([^"'>]+)["']/i);
  if (srcsetMatch) {
    // Extract the first URL from srcset
    const firstUrl = srcsetMatch[1].split(',')[0].split(' ')[0];
    if (firstUrl) return firstUrl;
  }
  
  return null;
};

// Get placeholder image (like crypto-news)
const getPlaceholderImage = (category: string): string => {
  // Array of beautiful Christian-themed images from Unsplash
  const christianImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop'
  ];
  
  // For church-themed categories, prioritize Christian images (70% chance)
  const churchThemedCategories = ['church', 'catholic', 'orthodox', 'methodist', 'episcopal', 'lutheran', 'ucc', 'adventist', 'pentecostal', 'faith', 'prayer', 'bible-study', 'theology', 'worship'];
  
  if (churchThemedCategories.includes(category.toLowerCase())) {
    // 70% chance for Christian images, 30% for regular placeholders
    if (Math.random() < 0.7) {
      return christianImages[Math.floor(Math.random() * christianImages.length)];
    }
  }
  
  // For all categories, mix Christian images with regular images (30% chance for Christian images)
  if (Math.random() < 0.3) {
    return christianImages[Math.floor(Math.random() * christianImages.length)];
  }
  
  // Regular placeholders for other categories
  const placeholders = {
    news: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop',
    church: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    missions: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    family: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop',
    youth: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    women: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=400&fit=crop',
    theology: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
    apologetics: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop',
    ministry: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    professionals: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    sports: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=400&fit=crop',
    music: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop',
    culture: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=400&fit=crop',
    'social-justice': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
    catholic: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop'
  };
  
  return placeholders[category as keyof typeof placeholders] || placeholders.news;
};

// Cache status (like crypto-news)
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

// Enhanced sample news data
const getEnhancedSampleNews = (): NewsArticle[] => {
  return [
    {
      id: 'sample-1',
      title: 'New Study Shows Positive Impact of Faith-Based Education',
      description: 'Recent research indicates that students in faith-based schools demonstrate higher academic achievement and better social skills compared to their peers in secular institutions.',
      link: 'https://example.com/faith-education-study',
      pubDate: new Date().toISOString(),
      source: 'Christian Education Today',
      category: 'education',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
    },
    {
      id: 'sample-2',
      title: 'Local Church Hosts Community Outreach Program',
      description: 'A local congregation organized a successful community service initiative, providing meals and support to over 200 families in need.',
      link: 'https://example.com/church-outreach',
      pubDate: new Date(Date.now() - 86400000).toISOString(),
      source: 'Community Christian News',
      category: 'church',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop'
    },
    {
      id: 'sample-3',
      title: 'Missionary Family Returns After 5 Years of Service',
      description: 'The Johnson family completed their mission work in South America, having established three new churches and trained local leaders.',
      link: 'https://example.com/missionary-return',
      pubDate: new Date(Date.now() - 172800000).toISOString(),
      source: 'Global Missions Report',
      category: 'missions',
      imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop'
    }
  ];
}; 