// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const xml2js = require('xml2js');

const app = express();
const PORT = process.env.PORT || 3002;
const ESV_API_KEY = process.env.ESV_API_KEY; // Optional ESV API key for premium translations

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Christian news sources RSS feeds - 40 Working Sources
const CHRISTIAN_NEWS_SOURCES = [
  // Major News Sources
  {
    name: 'Relevant Magazine',
    url: 'https://relevantmagazine.com/feed/',
    category: 'youth'
  },
  {
    name: 'Christianity Today',
    url: 'https://www.christianitytoday.com/rss',
    category: 'church'
  },
  {
    name: 'Christian Post',
    url: 'https://www.christianpost.com/rss',
    category: 'news'
  },
  {
    name: 'Worthy News',
    url: 'https://www.worthynews.com/feed',
    category: 'news'
  },
  {
    name: 'Catholic News Agency',
    url: 'https://www.catholicnewsagency.com/rss/news.xml',
    category: 'catholic'
  },
  {
    name: 'Gospel Coalition',
    url: 'https://www.thegospelcoalition.org/feed/',
    category: 'theology'
  },
  {
    name: 'Compassion International',
    url: 'https://blog.compassion.com/feed/',
    category: 'missions'
  },
  {
    name: 'Proverbs 31 Ministries',
    url: 'https://proverbs31.org/feed/',
    category: 'women'
  },
  {
    name: 'Ligonier Ministries',
    url: 'https://www.ligonier.org/feed/',
    category: 'theology'
  },
  {
    name: 'Christian Medical & Dental Associations',
    url: 'https://www.cmda.org/feed/',
    category: 'professionals'
  },
  {
    name: 'Ann Voskamp',
    url: 'https://www.aholyexperience.com/feed/',
    category: 'women'
  },
  // Faith & Ministry Sources
  {
    name: 'Answers in Genesis',
    url: 'https://www.answersingenesis.org/dailycontent.xml',
    category: 'apologetics'
  },
  {
    name: 'iBelieve',
    url: 'https://www.ibelieve.com/rss',
    category: 'faith'
  },
  {
    name: 'Christianity.com',
    url: 'https://www.christianity.com/rss',
    category: 'faith'
  },
  {
    name: 'Red Letter Christians',
    url: 'https://www.redletterchristians.org/feed',
    category: 'social-justice'
  },
  {
    name: 'Life Stream',
    url: 'https://www.lifestream.org/feed',
    category: 'ministry'
  },
  {
    name: 'Charisma News',
    url: 'https://www.charismanews.com/feed',
    category: 'ministry'
  },
  {
    name: 'Christian Headlines',
    url: 'https://www.christianheadlines.com/feed',
    category: 'church'
  },
  {
    name: 'Bible Gateway',
    url: 'https://www.biblegateway.com/blog/feed/',
    category: 'ministry'
  },
  {
    name: 'The Christian Century',
    url: 'https://www.christiancentury.org/rss.xml',
    category: 'church'
  },
  {
    name: 'CCM Magazine',
    url: 'https://www.ccmmagazine.com/feed/',
    category: 'music'
  },
  // Mission Organizations
  {
    name: 'Focus on the Family',
    url: 'https://www.focusonthefamily.com/feed/',
    category: 'family'
  },
  {
    name: 'Samaritan\'s Purse',
    url: 'https://www.samaritanspurse.org/feed/',
    category: 'missions'
  },
  {
    name: 'World Vision',
    url: 'https://www.worldvision.org/feed',
    category: 'missions'
  },
  {
    name: 'International Mission Board',
    url: 'https://www.imb.org/feed/',
    category: 'missions'
  },
  {
    name: 'North American Mission Board',
    url: 'https://www.namb.net/feed/',
    category: 'missions'
  },
  {
    name: 'Southern Baptist Convention',
    url: 'https://www.sbc.net/feed/',
    category: 'church'
  },
  {
    name: 'YWAM',
    url: 'https://www.ywam.org/feed/',
    category: 'missions'
  },
  {
    name: 'Navigators',
    url: 'https://www.navigators.org/feed/',
    category: 'ministry'
  },
  {
    name: 'Athletes in Action',
    url: 'https://www.athletesinaction.org/feed/',
    category: 'sports'
  },
  // Denominational Sources
  {
    name: 'Mennonite Church USA',
    url: 'https://www.mennoniteusa.org/feed/',
    category: 'church'
  },
  {
    name: 'Christian and Missionary Alliance',
    url: 'https://www.cmalliance.org/feed/',
    category: 'church'
  },
  {
    name: 'Wesleyan Church',
    url: 'https://www.wesleyan.org/feed',
    category: 'church'
  },
  // Women's Ministries
  {
    name: 'Lysa TerKeurst',
    url: 'https://lysaterkeurst.com/feed/',
    category: 'women'
  },
  {
    name: 'Priscilla Shirer',
    url: 'https://goingbeyond.com/feed/',
    category: 'women'
  },
  {
    name: 'Kay Arthur',
    url: 'https://www.precept.org/feed/',
    category: 'women'
  },
  {
    name: 'She Reads Truth',
    url: 'https://shereadstruth.com/feed/',
    category: 'women'
  },
  {
    name: 'Moms in Prayer',
    url: 'https://www.momsinprayer.org/feed/',
    category: 'women'
  },
  {
    name: 'Mothers of Preschoolers',
    url: 'https://www.mops.org/feed/',
    category: 'women'
  },
  // Professional Organizations
  {
    name: 'Christian Business Men\'s Connection',
    url: 'https://www.cbmc.com/feed/',
    category: 'professionals'
  },
  {
    name: 'Christian Apologetics & Research Ministry',
    url: 'https://carm.org/feed/',
    category: 'apologetics'
  },
  {
    name: 'Christianity Today Leadership',
    url: 'https://www.christianitytoday.com/leaders/feed',
    category: 'ministry'
  },
  {
    name: 'Christianity Today Women',
    url: 'https://www.christianitytoday.com/women/feed',
    category: 'family'
  },
  {
    name: 'Christianity Today Pastors',
    url: 'https://www.christianitytoday.com/pastors/feed',
    category: 'ministry'
  },
  {
    name: 'Christianity Today Church',
    url: 'https://www.christianitytoday.com/church/feed',
    category: 'church'
  },
  {
    name: 'Christianity Today Culture',
    url: 'https://www.christianitytoday.com/culture/feed',
    category: 'culture'
  },
  {
    name: 'Christianity Today Global',
    url: 'https://www.christianitytoday.com/global/feed',
    category: 'missions'
  }
];

// Cache for news articles
let newsCache = {
  articles: [],
  lastUpdated: null,
  nextUpdate: null
};

// Cache for other data
let dataCache = {
  ministryUpdates: [],
  prayerRequests: [],
  churchEvents: [],
  dailyVerse: null
};

// Daily YouTube cache
let dailyYouTubeCache = {
  data: null,
  lastUpdated: null,
  isToday: false
};

// Helper function to check if cache is from today
function isCacheFromToday(timestamp) {
  if (!timestamp) return false;
  const cacheDate = new Date(timestamp);
  const today = new Date();
  return cacheDate.toDateString() === today.toDateString();
}

// Function to reset daily cache at midnight
function resetDailyCache() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const timeUntilMidnight = tomorrow.getTime() - now.getTime();
  
  setTimeout(() => {
    console.log('🔄 Resetting daily YouTube cache at midnight');
    dailyYouTubeCache = {
      data: null,
      lastUpdated: null,
      isToday: false
    };
    // Schedule next reset
    resetDailyCache();
  }, timeUntilMidnight);
}

// Helper function to get placeholder image based on category
function getPlaceholderImage(category) {
  const placeholders = {
    'church': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'ministry': '/images/ChatGPT Image Jul 28, 2025, 09_28_38 PM.png',
    'youth': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    'family': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop',
    'missions': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    'worship': 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=400&fit=crop',
    'world': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
    'us': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'politics': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop',
    'health': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    'finance': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    'israel': 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=400&fit=crop',
    'entertainment': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop',
    'faith': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'social-justice': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=400&fit=crop',
    'music': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
    'catholic': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'regional': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
    'teaching': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'lifestyle': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop',
    'orthodox': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'news': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop',
    'research': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'apologetics': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'pentecostal': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'methodist': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'episcopal': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'lutheran': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'ucc': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'adventist': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'theology': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'prayer': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'bible-study': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'orphan-care': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'culture': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'spiritual-warfare': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'writing': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'default': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
  };
  
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
  
  // Mix Christian images with regular placeholders for all categories
  const allImages = [
    ...christianImages,
    ...Object.values(placeholders)
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
  
  return placeholders[category.toLowerCase()] || placeholders.default;
}

// Helper function to extract image from content
function extractImageUrl(content) {
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
}

// Helper function to clean HTML content
function cleanHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

// Helper function to fetch RSS feed
async function fetchRSSFeed(source) {
  try {
    const response = await axios.get(source.url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);

    let items = [];
    
    // Handle different RSS formats
    if (result.rss && result.rss.channel && result.rss.channel[0].item) {
      items = result.rss.channel[0].item;
    } else if (result.feed && result.feed.entry) {
      items = result.feed.entry;
    }

    if (!items || items.length === 0) {
      return [];
    }

    return items.map(item => {
      const title = item.title ? (Array.isArray(item.title) ? item.title[0] : item.title) : 'No Title';
      const description = item.description ? (Array.isArray(item.description) ? item.description[0] : item.description) : 
                        item.summary ? (Array.isArray(item.summary) ? item.summary[0] : item.summary) :
                        item['content:encoded'] ? (Array.isArray(item['content:encoded']) ? item['content:encoded'][0] : item['content:encoded']) : 
                        'No description available';
      
      const link = item.link ? (Array.isArray(item.link) ? item.link[0] : item.link) : 
                  item.id ? (Array.isArray(item.id) ? item.id[0] : item.id) : '#';
      
      const pubDate = item.pubDate ? (Array.isArray(item.pubDate) ? item.pubDate[0] : item.pubDate) :
                     item.published ? (Array.isArray(item.published) ? item.published[0] : item.published) :
                     item.updated ? (Array.isArray(item.updated) ? item.updated[0] : item.updated) :
                     new Date().toISOString();
      
      const author = item.author ? (Array.isArray(item.author) ? item.author[0] : item.author) :
                    item['dc:creator'] ? (Array.isArray(item['dc:creator']) ? item['dc:creator'][0] : item['dc:creator']) : null;

      // Extract image from various sources
      let imageUrl = null;
      
      // Try media:content (RSS 2.0 with media extensions)
      if (item['media:content'] && item['media:content'][0] && item['media:content'][0].$) {
        imageUrl = item['media:content'][0].$.url;
      }
      // Try media:thumbnail (RSS 2.0 with media extensions)
      else if (item['media:thumbnail'] && item['media:thumbnail'][0] && item['media:thumbnail'][0].$) {
        imageUrl = item['media:thumbnail'][0].$.url;
      }
      // Try enclosure (RSS 2.0 standard)
      else if (item.enclosure && item.enclosure[0] && item.enclosure[0].$.type && item.enclosure[0].$.type.startsWith('image/')) {
        imageUrl = item.enclosure[0].$.url;
      }
      // Try content:encoded (WordPress style)
      else if (item['content:encoded'] && item['content:encoded'][0]) {
        imageUrl = extractImageUrl(item['content:encoded'][0]);
      }
      // Try description
      else if (description) {
        imageUrl = extractImageUrl(description);
      }
      
      // If no image found, use placeholder based on category
      if (!imageUrl) {
        imageUrl = getPlaceholderImage(source.category);
        console.log(`📷 No image found for ${source.name} article, using placeholder`);
      } else {
        console.log(`📷 Found image for ${source.name} article: ${imageUrl.substring(0, 50)}...`);
      }

      return {
        id: `${source.name}-${Date.now()}-${Math.random()}`,
        title: cleanHtml(title),
        description: cleanHtml(description),
        link: link,
        pubDate: pubDate,
        source: source.name,
        category: source.category,
        imageUrl: imageUrl,
        author: author ? cleanHtml(author) : null
      };
    }).filter(article => article.title && article.title !== 'No Title' && article.link && article.link !== '#');
  } catch (error) {
    console.error(`Error fetching ${source.name}:`, error.message);
    return [];
  }
}

// Helper function to distribute articles by source for better diversity
function distributeArticlesBySource(articles) {
  if (!articles || articles.length === 0) return [];
  
  console.log('🔀 Distributing articles by source for better diversity...');
  
  // Group articles by source
  const sourceGroups = {};
  articles.forEach(article => {
    if (!sourceGroups[article.source]) {
      sourceGroups[article.source] = [];
    }
    sourceGroups[article.source].push(article);
  });
  
  // Get all sources
  const sources = Object.keys(sourceGroups);
  console.log(`📊 Found ${sources.length} sources: ${sources.join(', ')}`);
  
  const distributed = [];
  let consecutiveCount = {};
  
  // Initialize consecutive count for each source
  sources.forEach(source => {
    consecutiveCount[source] = 0;
  });
  
  // Ensure minimum 12 sources are represented in the first 24 articles
  const minimumSources = 12;
  const initialArticleCount = 24;
  const usedSources = new Set();
  
  // First pass: Get one article from each source until we have minimumSources
  console.log(`🎯 Ensuring at least ${minimumSources} sources in first ${initialArticleCount} articles...`);
  
  for (let i = 0; i < Math.min(minimumSources, sources.length); i++) {
    const source = sources[i];
    const sourceArticles = sourceGroups[source];
    if (sourceArticles.length > 0) {
      const article = sourceArticles.shift();
      distributed.push(article);
      consecutiveCount[source] = 1;
      usedSources.add(source);
      console.log(`✅ Added first article from ${source}`);
    }
  }
  
  // Second pass: Fill remaining slots ensuring no more than 2 consecutive from same source
  while (distributed.length < Math.min(initialArticleCount, articles.length)) {
    let added = false;
    
    // Try to add from a source that hasn't reached 2 consecutive
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];
      const sourceArticles = sourceGroups[source];
      if (sourceArticles.length === 0) continue;
      if (consecutiveCount[source] >= 2) continue;

      const article = sourceArticles.shift();
      distributed.push(article);
      consecutiveCount[source]++;
      usedSources.add(source);
      console.log(`✅ Added article from ${source} (consecutive: ${consecutiveCount[source]})`);
      
      // Reset other sources' consecutive count
      sources.forEach(s => { if (s !== source) { consecutiveCount[s] = 0; } });
      added = true;
      break;
    }

    // If no source available, reset all consecutive counts and try again
    if (!added) {
      console.log('🔄 Resetting consecutive counts...');
      sources.forEach(source => { consecutiveCount[source] = 0; });
      for (let i = 0; i < sources.length; i++) {
        const source = sources[i];
        const sourceArticles = sourceGroups[source];
        if (sourceArticles.length > 0) {
          const article = sourceArticles.shift();
          distributed.push(article);
          consecutiveCount[source] = 1;
          usedSources.add(source);
          console.log(`🔄 Added article from ${source} after reset`);
          break;
        }
      }
    }
  }

  console.log(`📈 Used ${usedSources.size} sources in first ${distributed.length} articles`);

  // Continue distributing remaining articles
  while (distributed.length < articles.length) {
    let added = false;
    
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];
      const sourceArticles = sourceGroups[source];
      if (sourceArticles.length === 0) continue;
      if (consecutiveCount[source] >= 2) continue;

      const article = sourceArticles.shift();
      distributed.push(article);
      consecutiveCount[source]++;
      sources.forEach(s => { if (s !== source) { consecutiveCount[s] = 0; } });
      added = true;
      break;
    }

    if (!added) {
      sources.forEach(source => { consecutiveCount[source] = 0; });
      for (let i = 0; i < sources.length; i++) {
        const source = sources[i];
        const sourceArticles = sourceGroups[source];
        if (sourceArticles.length > 0) {
          const article = sourceArticles.shift();
          distributed.push(article);
          consecutiveCount[source] = 1;
          break;
        }
      }
    }
  }

  console.log(`✅ Distribution complete: ${distributed.length} articles distributed from ${usedSources.size} sources`);
  return distributed;
}

// Function to update news cache
async function updateNewsCache() {
  try {
    console.log('Updating news cache...');
    
    const fetchPromises = CHRISTIAN_NEWS_SOURCES.map(source => fetchRSSFeed(source));
    const results = await Promise.allSettled(fetchPromises);
    
    const allArticles = results
      .filter(result => result.status === 'fulfilled')
      .flatMap(result => result.value)
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    // Distribute articles by source for better diversity
    const distributedArticles = distributeArticlesBySource(allArticles);

    // Only update cache if we got articles, otherwise keep existing cache
    if (distributedArticles.length > 0) {
      newsCache = {
        articles: distributedArticles,
        lastUpdated: new Date().toISOString(),
        nextUpdate: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes
      };
      // Count unique sources
      const uniqueSources = new Set(distributedArticles.map(article => article.source));
      console.log(`Updated news cache with ${distributedArticles.length} articles from ${uniqueSources.size} sources`);
    } else {
      // Keep existing cache if no new articles were fetched
      console.log('No new articles fetched, keeping existing cache');
      if (newsCache.articles.length > 0) {
        newsCache.lastUpdated = new Date().toISOString();
        newsCache.nextUpdate = new Date(Date.now() + 5 * 60 * 1000).toISOString();
      }
    }
  } catch (error) {
    console.error('Error updating news cache:', error);
  }
}

// Function to generate mock ministry updates
function generateMinistryUpdates() {
  const ministries = [
    'Samaritan\'s Purse',
    'World Vision',
    'Billy Graham Evangelistic Association',
    'Focus on the Family',
    'Campus Crusade for Christ',
    'Local Church Ministries'
  ];

  const categories = ['evangelism', 'disaster-relief', 'education', 'healthcare', 'social-justice'];
  const impacts = ['local', 'national', 'global'];

  return Array.from({ length: 10 }, (_, i) => ({
    id: `ministry-${i + 1}`,
    title: `Ministry Update ${i + 1}`,
    description: `This is a sample ministry update showing the work being done in various communities.`,
    ministry: ministries[Math.floor(Math.random() * ministries.length)],
    date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    impact: impacts[Math.floor(Math.random() * impacts.length)],
    category: categories[Math.floor(Math.random() * categories.length)]
  }));
}

// Function to generate mock prayer requests
function generatePrayerRequests() {
  const categories = ['health', 'family', 'missions', 'church', 'community'];
  const urgencies = ['low', 'medium', 'high'];

  return Array.from({ length: 8 }, (_, i) => ({
    id: `prayer-${i + 1}`,
    title: `Prayer Request ${i + 1}`,
    description: `This is a sample prayer request for the community.`,
    category: categories[Math.floor(Math.random() * categories.length)],
    urgency: urgencies[Math.floor(Math.random() * urgencies.length)],
    date: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString()
  }));
}

// Function to generate mock church events
function generateChurchEvents() {
  const churches = [
    'Grace Community Church',
    'First Baptist Church',
    'St. Mary\'s Catholic Church',
    'Calvary Chapel',
    'New Life Church'
  ];

  const types = ['service', 'conference', 'outreach', 'youth', 'worship'];

  return Array.from({ length: 6 }, (_, i) => ({
    id: `event-${i + 1}`,
    title: `Church Event ${i + 1}`,
    description: `This is a sample church event for the community.`,
    date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Main Sanctuary',
    church: churches[Math.floor(Math.random() * churches.length)],
    type: types[Math.floor(Math.random() * types.length)]
  }));
}

// Function to get daily Bible verse from API
async function getDailyVerse() {
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
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const selectedVerse = popularVerses[dayOfYear % popularVerses.length];

  // Try Bible-API.com first (free, reliable)
  try {
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

  // Try ESV API if key is available (premium quality)
  if (ESV_API_KEY) {
    try {
      const response = await axios.get(`https://api.esv.org/v3/passage/text/?q=${selectedVerse}&include-passage-references=false&include-verse-numbers=false&include-first-verse-numbers=false`, {
        timeout: 8000,
        headers: {
          'Authorization': `Token ${ESV_API_KEY}`,
          'User-Agent': 'The Christian Reporter/1.0'
        }
      });

      if (response.data && response.data.passages && response.data.passages.length > 0) {
        return {
          reference: response.data.query,
          text: response.data.passages[0].trim(),
          translation: 'ESV'
        };
      }
    } catch (error) {
      console.log('ESV API failed, trying alternatives...');
    }
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

  // Fallback verses if API fails
  const verses = [
    {
      reference: 'John 3:16',
      text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
      translation: 'NIV'
    },
    {
      reference: 'Philippians 4:13',
      text: 'I can do all this through him who gives me strength.',
      translation: 'NIV'
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
      text: 'The Lord is my shepherd, I lack nothing.',
      translation: 'NIV'
    },
    {
      reference: 'Matthew 28:19-20',
      text: 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you.',
      translation: 'NIV'
    },
    {
      reference: 'Galatians 5:22-23',
      text: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.',
      translation: 'NIV'
    },
    {
      reference: 'Proverbs 3:5-6',
      text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
      translation: 'NIV'
    }
  ];

  return verses[dayOfYear % verses.length];
}

// Initialize cache
async function initializeCache() {
  await updateNewsCache();
  dataCache.ministryUpdates = generateMinistryUpdates();
  dataCache.prayerRequests = generatePrayerRequests();
  dataCache.churchEvents = generateChurchEvents();
  dataCache.dailyVerse = await getDailyVerse();
}

// API Routes

// Newsletter management endpoints
app.get('/api/newsletter/subscribers', (req, res) => {
  try {
    const newsletterPath = path.join(__dirname, 'data', 'newsletter-subscribers.json');
    
    if (fs.existsSync(newsletterPath)) {
      const newsletterData = fs.readFileSync(newsletterPath, 'utf8');
      const data = JSON.parse(newsletterData);
      
      res.json({
        totalSubscribers: data.totalSubscribers,
        lastUpdated: data.lastUpdated,
        activeSubscribers: data.subscribers.filter(sub => sub.active).length
      });
    } else {
      res.json({
        totalSubscribers: 0,
        lastUpdated: null,
        activeSubscribers: 0
      });
    }
  } catch (error) {
    console.error('Error fetching newsletter data:', error);
    res.status(500).json({ error: 'Failed to fetch newsletter data' });
  }
});

app.post('/api/newsletter/subscribe', (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email required' });
    }
    
    const newsletterPath = path.join(__dirname, 'data', 'newsletter-subscribers.json');
    let newsletterData = { subscribers: [], lastUpdated: new Date().toISOString(), totalSubscribers: 0 };
    
    // Load existing subscribers
    if (fs.existsSync(newsletterPath)) {
      const existingData = fs.readFileSync(newsletterPath, 'utf8');
      newsletterData = JSON.parse(existingData);
    }
    
    // Check if email already exists
    const emailExists = newsletterData.subscribers.some(sub => sub.email === email);
    
    if (emailExists) {
      return res.status(409).json({ error: 'Email already subscribed' });
    }
    
    // Add new subscriber
    const newSubscriber = {
      email: email,
      subscribedAt: new Date().toISOString(),
      source: 'direct_signup',
      active: true
    };
    
    newsletterData.subscribers.push(newSubscriber);
    newsletterData.totalSubscribers = newsletterData.subscribers.length;
    newsletterData.lastUpdated = new Date().toISOString();
    
    // Save to file
    fs.writeFileSync(newsletterPath, JSON.stringify(newsletterData, null, 2));
    
    console.log('✅ Newsletter signup successful:', email);
    res.json({ success: true, message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ error: 'Failed to subscribe to newsletter' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Events endpoint
app.get('/api/events', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const eventsPath = path.join(__dirname, 'data', 'events.json');
    
    if (fs.existsSync(eventsPath)) {
      const eventsData = fs.readFileSync(eventsPath, 'utf8');
      const events = JSON.parse(eventsData);
      res.json(events);
    } else {
      // Return sample data if file doesn't exist
      res.json({
        events: [
          {
            id: "1",
            title: "Youth Group Bible Study",
            description: "Weekly Bible study for high school students",
            date: "2025-08-15",
            time: "18:00",
            duration: 90,
            location: "Church Fellowship Hall",
            ministry: "youth",
            contact: "Pastor Mike",
            registration: false,
            recurring: "weekly"
          }
        ]
      });
    }
  } catch (error) {
    console.error('Error serving events:', error);
    res.status(500).json({ error: 'Failed to load events' });
  }
});

// Prayer Requests endpoints
app.get('/api/prayer-requests', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const prayerPath = path.join(__dirname, 'data', 'prayer-requests.json');
    
    if (fs.existsSync(prayerPath)) {
      const prayerData = fs.readFileSync(prayerPath, 'utf8');
      const prayers = JSON.parse(prayerData);
      res.json(prayers);
    } else {
      // Return sample data if file doesn't exist
      res.json({
        requests: [
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
          }
        ]
      });
    }
  } catch (error) {
    console.error('Error serving prayer requests:', error);
    res.status(500).json({ error: 'Failed to load prayer requests' });
  }
});

app.post('/api/prayer-requests', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const prayerPath = path.join(__dirname, 'data', 'prayer-requests.json');
    
    // Read existing requests
    let requests = [];
    if (fs.existsSync(prayerPath)) {
      const prayerData = fs.readFileSync(prayerPath, 'utf8');
      const prayers = JSON.parse(prayerData);
      requests = prayers.requests || [];
    }
    
    // Add new request
    const newRequest = {
      id: `prayer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      urgency: req.body.urgency,
      date: new Date().toISOString(),
      anonymous: req.body.anonymous,
      email: req.body.email,
      prayerCount: 0
    };
    
    // Validate required fields
    if (!req.body.email || !req.body.title || !req.body.description) {
      return res.status(400).json({ error: 'Email, title, and description are required' });
    }
    
    requests.unshift(newRequest); // Add to beginning
    
    // Save to file
    fs.writeFileSync(prayerPath, JSON.stringify({ requests }, null, 2));
    

    
    res.json({ success: true, message: 'Prayer request submitted successfully' });
  } catch (error) {
    console.error('Error submitting prayer request:', error);
    res.status(500).json({ error: 'Failed to submit prayer request' });
  }
});

// Prayer Analytics endpoint
app.get('/api/prayer-analytics', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const prayerPath = path.join(__dirname, 'data', 'prayer-requests.json');
    
    if (fs.existsSync(prayerPath)) {
      const prayerData = fs.readFileSync(prayerPath, 'utf8');
      const prayers = JSON.parse(prayerData);
      const requests = prayers.requests || [];
      
      // Calculate analytics
      const totalRequests = requests.length;
      const recentActivity = requests.filter(r => {
        const requestDate = new Date(r.date);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return requestDate >= weekAgo;
      }).length;
      
      // Get trending topics (most common words in titles)
      const allWords = requests.flatMap(r => 
        r.title.toLowerCase().split(' ').filter(word => word.length > 3)
      );
      const wordCount = {};
      allWords.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });
      const trendingTopics = Object.entries(wordCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([word]) => word);
      
      // Get top categories
      const categoryCount = {};
      requests.forEach(r => {
        categoryCount[r.category] = (categoryCount[r.category] || 0) + 1;
      });
      const topCategories = Object.entries(categoryCount)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      
      res.json({
        totalRequests,
        trendingTopics,
        recentActivity,
        topCategories
      });
    } else {
      res.json({
        totalRequests: 0,
        trendingTopics: [],
        recentActivity: 0,
        topCategories: []
      });
    }
  } catch (error) {
    console.error('Error serving prayer analytics:', error);
    res.status(500).json({ error: 'Failed to load prayer analytics' });
  }
});

// Update prayer count endpoint
app.post('/api/prayer-requests/:id/pray', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const { id } = req.params;
    const prayerPath = path.join(__dirname, 'data', 'prayer-requests.json');
    const prayedPath = path.join(__dirname, 'data', 'prayed-tracking.json');
    
    // Get client identifier (IP + User-Agent for better uniqueness)
    const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const userAgent = req.headers['user-agent'] || '';
    const clientId = `${clientIP}-${userAgent.substring(0, 50)}`;
    
    // Load prayed tracking data
    let prayedTracking = {};
    if (fs.existsSync(prayedPath)) {
      const trackingData = fs.readFileSync(prayedPath, 'utf8');
      prayedTracking = JSON.parse(trackingData);
    }
    
    // Check if this client has already prayed for this request
    if (!prayedTracking[clientId]) {
      prayedTracking[clientId] = [];
    }
    
    if (prayedTracking[clientId].includes(id)) {
      return res.status(400).json({ 
        error: 'You have already prayed for this request',
        message: 'Each person can only pray once per request',
        alreadyPrayed: true
      });
    }
    
    // Rate limiting: max 20 prayers per day per client
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    const recentPrayers = prayedTracking[clientId].filter(prayerId => {
      // For now, we'll just count total prayers. In production, you'd store timestamps
      return true; // Simplified for demo
    });
    
    if (recentPrayers.length >= 20) {
      return res.status(429).json({ 
        error: 'Daily prayer limit reached',
        message: 'You can pray for up to 20 requests per day. Please try again tomorrow.' 
      });
    }
    
    if (fs.existsSync(prayerPath)) {
      const prayerData = fs.readFileSync(prayerPath, 'utf8');
      const prayers = JSON.parse(prayerData);
      const requests = prayers.requests || [];
      
      const requestIndex = requests.findIndex(r => r.id === id);
      if (requestIndex !== -1) {
        requests[requestIndex].prayerCount = (requests[requestIndex].prayerCount || 0) + 1;
        
        // Save updated prayer data
        fs.writeFileSync(prayerPath, JSON.stringify({ requests }, null, 2));
        
        // Track this prayer with timestamp
        prayedTracking[clientId].push({
          id: id,
          timestamp: Date.now()
        });
        fs.writeFileSync(prayedPath, JSON.stringify(prayedTracking, null, 2));
        
        res.json({ 
          success: true, 
          prayerCount: requests[requestIndex].prayerCount,
          message: 'Prayer count updated successfully',
          dailyPrayers: prayedTracking[clientId].length
        });
      } else {
        res.status(404).json({ error: 'Prayer request not found' });
      }
    } else {
      res.status(404).json({ error: 'Prayer requests file not found' });
    }
  } catch (error) {
    console.error('Error updating prayer count:', error);
    res.status(500).json({ error: 'Failed to update prayer count' });
  }
});

// Get user's prayer status endpoint
app.get('/api/prayer-requests/:id/status', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const { id } = req.params;
    const prayedPath = path.join(__dirname, 'data', 'prayed-tracking.json');
    
    const clientIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const userAgent = req.headers['user-agent'] || '';
    const clientId = `${clientIP}-${userAgent.substring(0, 50)}`;
    
    let prayedTracking = {};
    if (fs.existsSync(prayedPath)) {
      const trackingData = fs.readFileSync(prayedPath, 'utf8');
      prayedTracking = JSON.parse(trackingData);
    }
    
    const hasPrayed = prayedTracking[clientId]?.some(prayer => 
      typeof prayer === 'string' ? prayer === id : prayer.id === id
    ) || false;
    
    res.json({ 
      hasPrayed,
      dailyPrayers: prayedTracking[clientId]?.length || 0
    });
  } catch (error) {
    console.error('Error checking prayer status:', error);
    res.status(500).json({ error: 'Failed to check prayer status' });
  }
});

// Get news articles with pagination
app.get('/api/news', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const fastLoad = req.query.fast === 'true';
    
    console.log(`📰 News request: page=${page}, limit=${limit}, fastLoad=${fastLoad}`);
    
    // Check if we have cached articles
    if (newsCache.articles && newsCache.articles.length > 0) {
      console.log(`📰 Serving ${newsCache.articles.length} cached articles`);
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedArticles = newsCache.articles.slice(startIndex, endIndex);
      
      return res.json({
        articles: paginatedArticles,
        total: newsCache.articles.length,
        page: page,
        limit: limit,
        totalPages: Math.ceil(newsCache.articles.length / limit),
        cached: true,
        timestamp: newsCache.lastUpdated
      });
    }
    
    // If no cached articles, try to fetch them
    console.log('📰 No cached articles, fetching fresh data...');
    await updateNewsCache();
    
    if (newsCache.articles && newsCache.articles.length > 0) {
      console.log(`📰 Fetched ${newsCache.articles.length} fresh articles`);
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedArticles = newsCache.articles.slice(startIndex, endIndex);
      
      return res.json({
        articles: paginatedArticles,
        total: newsCache.articles.length,
        page: page,
        limit: limit,
        totalPages: Math.ceil(newsCache.articles.length / limit),
        cached: false,
        timestamp: newsCache.lastUpdated
      });
    } else {
      // Fallback to sample data if RSS feeds fail
      console.log('📰 RSS feeds failed, using fallback data');
      const fallbackArticles = [
        {
          id: 'fallback-1',
          title: 'Christian Community Responds to Natural Disaster',
          description: 'Local churches and ministries are coming together to provide relief and support to affected families.',
          link: '#',
          pubDate: new Date().toISOString(),
          source: 'Christian Headlines',
          category: 'community',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
          author: 'Staff Reporter'
        },
        {
          id: 'fallback-2',
          title: 'New Bible Study Program Launches Nationwide',
          description: 'A comprehensive Bible study program designed for small groups is now available across the country.',
          link: '#',
          pubDate: new Date(Date.now() - 86400000).toISOString(),
          source: 'Christianity Today',
          category: 'ministry',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
          author: 'Ministry Team'
        },
        {
          id: 'fallback-3',
          title: 'Youth Ministry Conference Draws Record Attendance',
          description: 'Over 1,000 youth leaders gathered for the annual conference focused on engaging young people in faith.',
          link: '#',
          pubDate: new Date(Date.now() - 172800000).toISOString(),
          source: 'Relevant Magazine',
          category: 'youth',
          imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
          author: 'Youth Ministry Network'
        },
        {
          id: 'fallback-4',
          title: 'Mission Trip to Guatemala Brings Hope',
          description: 'Volunteers from local churches provided medical care and spiritual support to rural communities.',
          link: '#',
          pubDate: new Date(Date.now() - 259200000).toISOString(),
          source: 'Samaritan\'s Purse',
          category: 'missions',
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
          author: 'Mission Team'
        },
        {
          id: 'fallback-5',
          title: 'Family Ministry Focuses on Strong Marriages',
          description: 'New program helps couples build stronger relationships through biblical principles and counseling.',
          link: '#',
          pubDate: new Date(Date.now() - 345600000).toISOString(),
          source: 'Focus on the Family',
          category: 'family',
          imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=400&fit=crop',
          author: 'Family Ministry'
        },
        {
          id: 'fallback-6',
          title: 'Worship Music Festival Celebrates Faith',
          description: 'Thousands gathered for a weekend of praise and worship featuring top Christian artists.',
          link: '#',
          pubDate: new Date(Date.now() - 432000000).toISOString(),
          source: 'CCM Magazine',
          category: 'worship',
          imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=400&fit=crop',
          author: 'Worship Team'
        },
        {
          id: 'fallback-7',
          title: 'Church Planting Movement Grows',
          description: 'New churches are being established in urban areas to reach diverse communities.',
          link: '#',
          pubDate: new Date(Date.now() - 518400000).toISOString(),
          source: 'Christian Post',
          category: 'church',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
          author: 'Church Planting Network'
        },
        {
          id: 'fallback-8',
          title: 'Biblical Archaeology Discovery Excites Scholars',
          description: 'Recent findings provide new insights into ancient biblical texts and historical context.',
          link: '#',
          pubDate: new Date(Date.now() - 604800000).toISOString(),
          source: 'Answers in Genesis',
          category: 'apologetics',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
          author: 'Archaeology Team'
        },
        {
          id: 'fallback-9',
          title: 'Christian Education Program Expands',
          description: 'Online learning platform helps students grow in faith while pursuing academic excellence.',
          link: '#',
          pubDate: new Date(Date.now() - 691200000).toISOString(),
          source: 'Christianity.com',
          category: 'education',
          imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
          author: 'Education Ministry'
        },
        {
          id: 'fallback-10',
          title: 'Prayer Movement Sweeps College Campuses',
          description: 'Students are organizing prayer groups and Bible studies across university campuses nationwide.',
          link: '#',
          pubDate: new Date(Date.now() - 777600000).toISOString(),
          source: 'Campus Crusade for Christ',
          category: 'youth',
          imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
          author: 'Campus Ministry'
        },
        {
          id: 'fallback-11',
          title: 'Disaster Relief Teams Deploy Nationwide',
          description: 'Christian organizations are providing emergency assistance to communities affected by recent storms.',
          link: '#',
          pubDate: new Date(Date.now() - 864000000).toISOString(),
          source: 'World Vision',
          category: 'missions',
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
          author: 'Relief Team'
        },
        {
          id: 'fallback-12',
          title: 'Biblical Counseling Conference Addresses Mental Health',
          description: 'Mental health professionals and pastors gather to discuss faith-based approaches to counseling.',
          link: '#',
          pubDate: new Date(Date.now() - 950400000).toISOString(),
          source: 'Christian Counseling Association',
          category: 'ministry',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
          author: 'Counseling Team'
        }
      ];
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedArticles = fallbackArticles.slice(startIndex, endIndex);
      
      return res.json({
        articles: paginatedArticles,
        total: fallbackArticles.length,
        page: page,
        limit: limit,
        totalPages: Math.ceil(fallbackArticles.length / limit),
        cached: false,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error in /api/news endpoint:', error);
    res.status(500).json({ error: 'Failed to load news articles' });
  }
});

// Get cache status
app.get('/api/cache-status', (req, res) => {
  const uniqueSources = new Set(newsCache.articles.map(a => a.source));
  res.json({
    lastUpdated: newsCache.lastUpdated,
    totalArticles: newsCache.articles.length,
    sourcesCount: CHRISTIAN_NEWS_SOURCES.length,
    uniqueSourcesCount: uniqueSources.size,
    sources: Array.from(uniqueSources),
    nextUpdate: newsCache.nextUpdate
  });
});

// Get ministry updates
app.get('/api/ministry-updates', (req, res) => {
  res.json(dataCache.ministryUpdates);
});

// Get church events
app.get('/api/church-events', (req, res) => {
  res.json(dataCache.churchEvents);
});

// Get daily Bible verse
app.get('/api/daily-verse', (req, res) => {
  res.json(dataCache.dailyVerse);
});

// Refresh daily Bible verse
app.post('/api/refresh-verse', async (req, res) => {
  try {
    dataCache.dailyVerse = await getDailyVerse();
    res.json({ success: true, verse: dataCache.dailyVerse });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to refresh verse' });
  }
});

// Manual cache refresh endpoint
app.post('/api/refresh-cache', async (req, res) => {
  try {
    console.log('🔄 Manual cache refresh requested...');
    await updateNewsCache();
    res.json({ 
      success: true, 
      message: 'Cache refreshed successfully',
      articlesCount: newsCache.articles.length,
      sourcesCount: new Set(newsCache.articles.map(a => a.source)).size
    });
  } catch (error) {
    console.error('❌ Cache refresh failed:', error);
    res.status(500).json({ success: false, message: 'Failed to refresh cache' });
  }
});

// Christian Social Media endpoint with daily caching
app.get('/api/christian-social-media', async (req, res) => {
  try {
    console.log('📡 Fetching Christian social media content...');
    
    // Check if we have today's cache
    if (dailyYouTubeCache.data && isCacheFromToday(dailyYouTubeCache.lastUpdated)) {
      console.log('📦 Serving today\'s cached YouTube content');
      return res.json({
        posts: dailyYouTubeCache.data,
        total: dailyYouTubeCache.data.length,
        fromCache: true
      });
    }
    
    // Check if we're close to quota limit (8,000 out of 10,000)
    const quotaThreshold = 8000;
    const currentQuota = 8948; // This would need to be tracked dynamically
    
    if (currentQuota > quotaThreshold) {
      console.log('⚠️ YouTube API quota threshold reached. Using fallback data.');
      const fallbackPosts = [
        {
          id: '3sMWPKHgc_I',
          platform: 'youtube',
          title: 'Christian Podcast: Understanding the Book of Romans',
          description: 'Deep dive into Paul\'s letter to the Romans - understanding grace and salvation through biblical teaching.',
          author: 'Biblical Insights Podcast',
          authorAvatar: 'https://via.placeholder.com/40x40/059669/FFFFFF?text=B',
          thumbnail: 'https://via.placeholder.com/300x200/059669/FFFFFF?text=Podcast',
          url: 'https://www.youtube.com/live/3sMWPKHgc_I?si=593e4VIa8O-D-ZRM',
          views: 23450,
          likes: 1567,
          comments: 234,
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          duration: 'PT45M12S',
          isPodcast: true
        },
        {
          id: 'R5BCk7bsrwU',
          platform: 'youtube',
          title: 'Worship Service: Sunday Morning Praise',
          description: 'Complete worship service featuring contemporary Christian music and traditional hymns.',
          author: 'Faith Community Church',
          authorAvatar: 'https://via.placeholder.com/40x40/7C3AED/FFFFFF?text=F',
          thumbnail: 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Worship',
          url: 'https://youtu.be/R5BCk7bsrwU?si=EIJNEDE6BlEWVYuT',
          views: 18920,
          likes: 1234,
          comments: 178,
          publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
          duration: 'PT1H28M45S',
          isPodcast: false
        }
      ];
      return res.json({
        posts: fallbackPosts,
        total: fallbackPosts.length,
        quotaExceeded: true
      });
    }
    
    // Fetch fresh content for today (only 2 API calls total)
    console.log('🔄 Fetching fresh YouTube content for today...');
    const freshContent = await fetchDailyYouTubeContent();
    
    // Cache the results for the rest of the day
    dailyYouTubeCache = {
      data: freshContent,
      lastUpdated: Date.now()
    };
    
    console.log(`📊 Returning ${freshContent.length} fresh posts for today`);
    res.json({ 
      posts: freshContent, 
      total: freshContent.length,
      fromCache: false
    });
    
  } catch (error) {
    console.error('❌ Error in Christian social media endpoint:', error);
    // Fallback to curated data if APIs fail
    const fallbackPosts = [
      {
        id: '3sMWPKHgc_I',
        platform: 'youtube',
        title: 'Christian Podcast: Understanding the Book of Romans',
        description: 'Deep dive into Paul\'s letter to the Romans - understanding grace and salvation through biblical teaching.',
        author: 'Biblical Insights Podcast',
        authorAvatar: 'https://via.placeholder.com/40x40/059669/FFFFFF?text=B',
        thumbnail: 'https://via.placeholder.com/300x200/059669/FFFFFF?text=Podcast',
        url: 'https://www.youtube.com/live/3sMWPKHgc_I?si=593e4VIa8O-D-ZRM',
        views: 23450,
        likes: 1567,
        comments: 234,
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        duration: 'PT45M12S',
        isPodcast: true
      },
      {
        id: 'R5BCk7bsrwU',
        platform: 'youtube',
        title: 'Worship Service: Sunday Morning Praise',
        description: 'Complete worship service featuring contemporary Christian music and traditional hymns.',
        author: 'Faith Community Church',
        authorAvatar: 'https://via.placeholder.com/40x40/7C3AED/FFFFFF?text=F',
        thumbnail: 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Worship',
        url: 'https://youtu.be/R5BCk7bsrwU?si=EIJNEDE6BlEWVYuT',
        views: 18920,
        likes: 1234,
        comments: 178,
        publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        duration: 'PT1H28M45S',
        isPodcast: false
      }
    ];
    return res.json({
      posts: fallbackPosts,
      total: fallbackPosts.length,
      quotaExceeded: true
    });
  }
});

// Helper function to parse YouTube duration to seconds
function parseDurationToSeconds(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;

  let totalSeconds = 0;
  if (match[1]) totalSeconds += parseInt(match[1].replace('H', '')) * 3600;
  if (match[2]) totalSeconds += parseInt(match[2].replace('M', '')) * 60;
  if (match[3]) totalSeconds += parseInt(match[3].replace('S', ''));

  return totalSeconds;
}

// Helper function to get the best available thumbnail URL
function getBestThumbnailUrl(videoId, thumbnails) {
  console.log(`🔍 Getting thumbnail for video ${videoId}:`, JSON.stringify(thumbnails, null, 2));
  
  // Try different thumbnail qualities in order of preference
  const thumbnailQualities = ['maxres', 'high', 'medium', 'default'];
  
  for (const quality of thumbnailQualities) {
    if (thumbnails?.[quality]?.url) {
      const url = thumbnails[quality].url;
      // Validate URL format
      if (url && url.startsWith('http') && url.includes('ytimg.com')) {
        console.log(`✅ Using ${quality} thumbnail: ${url}`);
        return url;
      } else {
        console.log(`⚠️ Invalid ${quality} thumbnail URL: ${url}`);
      }
    }
  }
  
  // Fallback to YouTube's default thumbnail service
  const fallbackUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  console.log(`🔄 Using fallback thumbnail: ${fallbackUrl}`);
  return fallbackUrl;
}

// Helper function to fetch daily YouTube content (1 worship video + 1 podcast)
async function fetchDailyYouTubeContent() {
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    
    if (!YOUTUBE_API_KEY) {
      console.log('YouTube API key not configured, using fallback data');
      return [];
    }
    
    const posts = [];
    
    // Fetch 1 podcast
    try {
      console.log('🔍 Fetching 1 Christian podcast...');
      const podcastResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: 'Christian Podcast',
          type: 'video',
          maxResults: 1,  // Only 1 result
          order: 'relevance',
          publishedAfter: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          key: process.env.YOUTUBE_API_KEY
        },
        timeout: 10000
      });

      if (podcastResponse.data.items && podcastResponse.data.items.length > 0) {
        const videoId = podcastResponse.data.items[0].id.videoId;
        
        // Get detailed video information
        const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'snippet,contentDetails,statistics',
            id: videoId,
            key: process.env.YOUTUBE_API_KEY
          },
          timeout: 10000
        });

        if (videoResponse.data.items && videoResponse.data.items.length > 0) {
          const video = videoResponse.data.items[0];
          const title = video.snippet.title.toLowerCase();
          const description = video.snippet.description.toLowerCase();
          
          // Check if content is a podcast
          const isPodcast = title.includes('podcast') || description.includes('podcast') ||
                          title.includes('episode') || description.includes('episode');
          
          // Check for WWE content to exclude
          const hasWWE = title.includes('wwe') || description.includes('wwe') ||
                        title.includes('wrestling') || description.includes('wrestling');
          
          // Get duration in seconds
          const duration = video.contentDetails.duration;
          const durationInSeconds = parseDurationToSeconds(duration);
          
          // Only allow podcasts over 20 minutes, exclude WWE
          const isAllowedContent = isPodcast && !hasWWE;
          const meetsDurationRequirement = durationInSeconds >= 1200;
          
          if (isAllowedContent && meetsDurationRequirement) {
            const thumbnailUrl = getBestThumbnailUrl(video.id, video.snippet.thumbnails);
            const authorAvatarUrl = video.snippet.thumbnails?.default?.url || `https://img.youtube.com/vi/${video.id}/default.jpg`;

            const post = {
              id: video.id,
              platform: 'youtube',
              title: video.snippet.title,
              description: video.snippet.description,
              author: video.snippet.channelTitle,
              authorAvatar: authorAvatarUrl,
              thumbnail: thumbnailUrl,
              url: `https://www.youtube.com/watch?v=${video.id}`,
              views: parseInt(video.statistics?.viewCount || '0'),
              likes: parseInt(video.statistics?.likeCount || '0'),
              comments: parseInt(video.statistics?.commentCount || '0'),
              publishedAt: video.snippet.publishedAt,
              duration: video.contentDetails.duration,
              isPodcast: true
            };
            
            posts.push(post);
            console.log('✅ Found 1 podcast');
          }
        }
      }
    } catch (error) {
      console.error('❌ Error fetching podcast:', error.response?.data || error.message);
    }
    
    // Fetch 1 worship service
    try {
      console.log('🔍 Fetching 1 worship service...');
      const worshipResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: 'worship service',
          type: 'video',
          maxResults: 1,  // Only 1 result
          order: 'relevance',
          publishedAfter: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          key: process.env.YOUTUBE_API_KEY
        },
        timeout: 10000
      });

      if (worshipResponse.data.items && worshipResponse.data.items.length > 0) {
        const videoId = worshipResponse.data.items[0].id.videoId;
        
        // Get detailed video information
        const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'snippet,contentDetails,statistics',
            id: videoId,
            key: process.env.YOUTUBE_API_KEY
          },
          timeout: 10000
        });

        if (videoResponse.data.items && videoResponse.data.items.length > 0) {
          const video = videoResponse.data.items[0];
          const title = video.snippet.title.toLowerCase();
          const description = video.snippet.description.toLowerCase();
          
          // Check if content is worship service
          const isWorshipService = title.includes('worship service') || description.includes('worship service') ||
                                 title.includes('worship') || description.includes('worship');
          
          // Check for WWE content to exclude
          const hasWWE = title.includes('wwe') || description.includes('wwe') ||
                        title.includes('wrestling') || description.includes('wrestling');
          
          // Get duration in seconds
          const duration = video.contentDetails.duration;
          const durationInSeconds = parseDurationToSeconds(duration);
          
          // Only allow worship services over 20 minutes, exclude WWE
          const isAllowedContent = isWorshipService && !hasWWE;
          const meetsDurationRequirement = durationInSeconds >= 1200;
          
          if (isAllowedContent && meetsDurationRequirement) {
            const thumbnailUrl = getBestThumbnailUrl(video.id, video.snippet.thumbnails);
            const authorAvatarUrl = video.snippet.thumbnails?.default?.url || `https://img.youtube.com/vi/${video.id}/default.jpg`;

            const post = {
              id: video.id,
              platform: 'youtube',
              title: video.snippet.title,
              description: video.snippet.description,
              author: video.snippet.channelTitle,
              authorAvatar: authorAvatarUrl,
              thumbnail: thumbnailUrl,
              url: `https://www.youtube.com/watch?v=${video.id}`,
              views: parseInt(video.statistics?.viewCount || '0'),
              likes: parseInt(video.statistics?.likeCount || '0'),
              comments: parseInt(video.statistics?.commentCount || '0'),
              publishedAt: video.snippet.publishedAt,
              duration: video.contentDetails.duration,
              isPodcast: false
            };
            
            posts.push(post);
            console.log('✅ Found 1 worship service');
          }
        }
      }
    } catch (error) {
      console.error('❌ Error fetching worship service:', error.response?.data || error.message);
    }
    
    console.log(`📊 Daily fetch complete: ${posts.length} videos found`);
    return posts;
  } catch (error) {
    console.error('❌ Error fetching daily YouTube content:', error);
    return [];
  }
}

// Initialize cache and start server
async function startServer() {
  try {
    await initializeCache();
    resetDailyCache(); // Set up daily cache reset
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📰 News cache initialized with ${newsCache.articles.length} articles`);
      console.log(`📖 Daily verse: ${dataCache.dailyVerse?.reference || 'Not loaded'}`);
    });
    
    // Set up periodic cache updates
    setInterval(updateNewsCache, 5 * 60 * 1000); // Update every 5 minutes
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();