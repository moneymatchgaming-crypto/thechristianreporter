import axios from 'axios'
import { NewsArticle, BibleVerse, CacheStatus, MinistryUpdate, PrayerRequest, ChurchEvent } from '../types'

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

// Fast loading API - only loads limited articles from fewer feeds (like crypto-news)
export const getNewsFast = async (limit: number = 12): Promise<{ articles: NewsArticle[], total: number }> => {
  console.log(`🚀 Fast loading: Fetching ${limit} articles from priority feeds...`);
  
  try {
    // Try RSS2JSON API with API key (like crypto-news)
    const RSS2JSON_API_KEY = import.meta.env.VITE_RSS2JSON_API_KEY || 'YOUR_API_KEY_HERE';
    
    if (RSS2JSON_API_KEY !== 'YOUR_API_KEY_HERE') {
      // Use only first 4 feeds for fast loading (fewer than getNews which uses 8)
      const fastFeeds = CHRISTIAN_RSS_FEEDS.slice(0, 4);
      const feedPromises = fastFeeds.map(async (feed, index) => {
        try {
          const response = await axios.get('https://api.rss2json.com/v1/api.json', {
            params: {
              rss_url: feed.url,
              api_key: RSS2JSON_API_KEY,
              count: 5 // Get 5 per feed to have enough for pagination
            },
            timeout: 10000
          });
          
          if (response.data && response.data.status === 'ok' && response.data.items) {
            return parseRSSFromJSON(response.data, feed, index);
          }
        } catch (error: any) {
          console.log(`❌ Fast load failed for ${feed.name}:`, error.message);
        }
        return [];
      });
      
      const results = await Promise.allSettled(feedPromises);
      const allArticles = results
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => (result as PromiseFulfilledResult<NewsArticle[]>).value)
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      
      if (allArticles.length > 0) {
        // Return only the requested limit, but provide total count
        const firstPageArticles = allArticles.slice(0, limit);
        console.log(`📰 Fast load: Got ${firstPageArticles.length} articles (${allArticles.length} total available)`);
        return { articles: firstPageArticles, total: allArticles.length };
      }
    }
  } catch (error: any) {
    console.log('Fast load RSS2JSON failed:', error.message);
  }
  
  // Fallback to regular getNews but limit results
  try {
    const allArticles = await getNews();
    const limitedArticles = allArticles.slice(0, limit);
    console.log(`📰 Fast load fallback: Returning ${limitedArticles.length} articles`);
    return { articles: limitedArticles, total: allArticles.length };
  } catch (error: any) {
    console.error('Fast load fallback failed:', error.message);
    // Final fallback: sample data
    const sampleNews = getEnhancedSampleNews();
    return { articles: sampleNews.slice(0, limit), total: sampleNews.length };
  }
};

// News API - using RSS2JSON like crypto-news (loads all articles)
export const getNews = async (): Promise<NewsArticle[]> => {
  console.log('🚀 Fetching Christian news from RSS feeds...');
  
  try {
    // Try RSS2JSON API with API key (like crypto-news)
    const RSS2JSON_API_KEY = import.meta.env.VITE_RSS2JSON_API_KEY || 'YOUR_API_KEY_HERE';
    
    console.log('🔑 RSS2JSON API Key status:', RSS2JSON_API_KEY === 'YOUR_API_KEY_HERE' ? 'NOT CONFIGURED' : 'CONFIGURED');
    console.log('🔑 API Key length:', RSS2JSON_API_KEY.length);
    
    if (RSS2JSON_API_KEY !== 'YOUR_API_KEY_HERE') {
      // Use RSS2JSON API (like crypto-news)
      console.log('📡 Starting RSS2JSON API calls...');
      const feedPromises = CHRISTIAN_RSS_FEEDS.slice(0, 8).map(async (feed, index) => {
        try {
          console.log(`📡 Fetching ${feed.name} (${feed.url})...`);
          const response = await axios.get('https://api.rss2json.com/v1/api.json', {
            params: {
              rss_url: feed.url,
              api_key: RSS2JSON_API_KEY,
              count: 5
            },
            timeout: 15000
          });
          
          console.log(`📡 Response for ${feed.name}:`, response.status, response.data?.status);
          
          if (response.data && response.data.status === 'ok' && response.data.items) {
            const articles = parseRSSFromJSON(response.data, feed, index);
            console.log(`✅ ${feed.name}: Got ${articles.length} articles`);
            return articles;
          } else if (response.data && response.data.status === 'error') {
            console.log(`❌ ${feed.name}: RSS2JSON error - ${response.data.message}`);
          } else {
            console.log(`❌ ${feed.name}: Unexpected response format`);
          }
        } catch (error: any) {
          console.log(`❌ Failed to fetch ${feed.name}:`, error.message);
          if (error.response) {
            console.log(`❌ Response status: ${error.response.status}`);
            console.log(`❌ Response data:`, error.response.data);
          }
        }
        return [];
      });
      
      const results = await Promise.allSettled(feedPromises);
      console.log(`📊 RSS2JSON results: ${results.length} promises settled`);
      
      const allArticles = results
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => (result as PromiseFulfilledResult<NewsArticle[]>).value)
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      
      console.log(`📰 Total articles from RSS2JSON: ${allArticles.length}`);
      
      if (allArticles.length > 0) {
        console.log(`📰 Successfully fetched ${allArticles.length} articles from RSS2JSON`);
        return allArticles;
      } else {
        console.log('⚠️ RSS2JSON returned 0 articles, trying fallbacks...');
      }
    } else {
      console.log('⚠️ RSS2JSON API key not configured. Trying free alternatives...');
    }
    
    // Try free RSS2JSON service (limited but works)
    try {
      console.log('🔄 Trying free RSS2JSON service...');
      const freeFeedPromises = CHRISTIAN_RSS_FEEDS.slice(0, 3).map(async (feed, index) => {
        try {
          console.log(`📡 Free service: Fetching ${feed.name}...`);
          const response = await axios.get('https://api.rss2json.com/v1/api.json', {
            params: {
              rss_url: feed.url,
              count: 3
            },
            timeout: 20000
          });
          
          if (response.data && response.data.status === 'ok' && response.data.items) {
            const articles = parseRSSFromJSON(response.data, feed, index);
            console.log(`✅ Free service: ${feed.name} got ${articles.length} articles`);
            return articles;
          }
        } catch (error: any) {
          console.log(`❌ Free RSS2JSON failed for ${feed.name}:`, error.message);
        }
        return [];
      });
      
      const results = await Promise.allSettled(freeFeedPromises);
      const allArticles = results
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => (result as PromiseFulfilledResult<NewsArticle[]>).value)
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      
      if (allArticles.length > 0) {
        console.log(`📰 Free RSS2JSON: Got ${allArticles.length} articles`);
        return allArticles;
      }
    } catch (error: any) {
      console.log('Free RSS2JSON service failed:', error.message);
    }
    
  } catch (error: any) {
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
    
    const newsPromises = CHRISTIAN_RSS_FEEDS.slice(0, 3).map(async (feed, feedIndex) => {
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
    
  } catch (error: any) {
    console.error('Error fetching news:', error.message);
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
  // Array of beautiful stained glass images from Unsplash
  const stainedGlassImages = [
    'https://images.unsplash.com/photo-1548092462-d49ec1620276?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1550541231-56ddb7f844ec?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1584476037416-2c251d2b0bda?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1632230997264-b2bfc65cb8b4?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1517340182-ddc4e441b011?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1447858496759-dd23e166e1c5?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1543817625-3cbb6d1a6e32?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1579127499396-1fc18048a068?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1534842471718-d2c5afe852af?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1577222512383-ed8bb23c0f2d?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1700515968122-bbf480e158ac?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1555679432-b7b7a5e3680c?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1593647971669-68417429a6d3?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1521852227471-4e6a119d15d4?q=80&w=800&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];

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
  
  // For faith-themed categories, prioritize stained glass images (80% chance)
  const faithThemedCategories = ['church', 'catholic', 'orthodox', 'methodist', 'episcopal', 'lutheran', 'ucc', 'adventist', 'pentecostal', 'faith', 'prayer', 'bible-study', 'theology', 'worship', 'missions', 'apologetics'];
  
  if (faithThemedCategories.includes(category.toLowerCase())) {
    // 80% chance for stained glass, 20% for Christian images
    if (Math.random() < 0.8) {
      return stainedGlassImages[Math.floor(Math.random() * stainedGlassImages.length)];
    } else {
      return christianImages[Math.floor(Math.random() * christianImages.length)];
    }
  }
  
  // For all categories, mix stained glass with Christian images (40% chance for stained glass, 30% for Christian images)
  if (Math.random() < 0.4) {
    return stainedGlassImages[Math.floor(Math.random() * stainedGlassImages.length)];
  } else if (Math.random() < 0.3) {
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

// Refresh daily verse (alias for getDailyVerse)
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
    },
    {
      id: 'sample-4',
      title: 'Youth Ministry Conference Draws Record Attendance',
      description: 'Over 1,000 youth leaders gathered for the annual conference focused on engaging young people in faith and building stronger communities.',
      link: 'https://example.com/youth-conference',
      pubDate: new Date(Date.now() - 259200000).toISOString(),
      source: 'Relevant Magazine',
      category: 'youth',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop'
    },
    {
      id: 'sample-5',
      title: 'Christian Business Leaders Launch Mentorship Program',
      description: 'A new initiative connects experienced Christian business professionals with young entrepreneurs, providing guidance and spiritual support.',
      link: 'https://example.com/business-mentorship',
      pubDate: new Date(Date.now() - 345600000).toISOString(),
      source: 'Christian Business Network',
      category: 'professionals',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop'
    },
    {
      id: 'sample-6',
      title: 'Family Ministry Focuses on Strong Marriages',
      description: 'New program helps couples build stronger relationships through biblical principles and professional counseling services.',
      link: 'https://example.com/marriage-program',
      pubDate: new Date(Date.now() - 432000000).toISOString(),
      source: 'Focus on the Family',
      category: 'family',
      imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=400&fit=crop'
    },
    {
      id: 'sample-7',
      title: 'Christian Apologetics Conference Addresses Modern Challenges',
      description: 'Leading scholars and speakers gathered to discuss how to defend the Christian faith in today\'s increasingly secular culture.',
      link: 'https://example.com/apologetics-conference',
      pubDate: new Date(Date.now() - 518400000).toISOString(),
      source: 'Christian Apologetics Network',
      category: 'apologetics',
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop'
    },
    {
      id: 'sample-8',
      title: 'Women\'s Ministry Launches Online Bible Study',
      description: 'New virtual platform brings together women from around the world for weekly Bible study and spiritual growth.',
      link: 'https://example.com/womens-bible-study',
      pubDate: new Date(Date.now() - 604800000).toISOString(),
      source: 'Women of Faith',
      category: 'women',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop'
    },
    {
      id: 'sample-9',
      title: 'Christian Music Festival Celebrates 25th Anniversary',
      description: 'Annual event brings together top Christian artists and thousands of worshippers for a weekend of music and ministry.',
      link: 'https://example.com/music-festival',
      pubDate: new Date(Date.now() - 691200000).toISOString(),
      source: 'CCM Magazine',
      category: 'music',
      imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop'
    },
    {
      id: 'sample-10',
      title: 'Theological Seminary Expands Online Programs',
      description: 'Leading Christian seminary announces new online degree programs to make theological education more accessible.',
      link: 'https://example.com/seminary-online',
      pubDate: new Date(Date.now() - 777600000).toISOString(),
      source: 'Theological Education Today',
      category: 'theology',
      imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=400&fit=crop'
    }
  ];
}; 