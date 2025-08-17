const axios = require('axios');

// Test RSS feeds directly
const testFeeds = [
  'https://www.christianitytoday.com/rss',
  'https://www.christianpost.com/rss',
  'https://www.worthynews.com/feed',
  'https://relevantmagazine.com/feed/',
  'https://www.catholicnewsagency.com/rss/news.xml'
];

async function testRSSFeed(url) {
  try {
    console.log(`\n📡 Testing: ${url}`);
    
    // Test with CORS proxy first
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    console.log(`   Using proxy: ${proxyUrl}`);
    
    const response = await axios.get(proxyUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (response.data) {
      const content = response.data.toString();
      console.log(`   ✅ Success: Got ${content.length} characters`);
      
      // Check if it looks like RSS
      if (content.includes('<rss') || content.includes('<feed') || content.includes('<xml')) {
        console.log(`   📰 Valid RSS/XML content detected`);
        
        // Try to extract a title
        const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
        if (titleMatch) {
          console.log(`   📝 Title: ${titleMatch[1].trim()}`);
        }
      } else {
        console.log(`   ❌ Doesn't look like RSS content`);
        console.log(`   📄 First 200 chars: ${content.substring(0, 200)}...`);
      }
    } else {
      console.log(`   ❌ No data received`);
    }
    
  } catch (error) {
    console.log(`   ❌ Failed: ${error.message}`);
    if (error.response) {
      console.log(`      Status: ${error.response.status}`);
    }
  }
}

async function testRSS2JSON() {
  try {
    console.log('\n🔑 Testing RSS2JSON API...');
    
    // Test without API key first (free tier)
    const testUrl = 'https://www.christianitytoday.com/rss';
    const response = await axios.get('https://api.rss2json.com/v1/api.json', {
      params: {
        rss_url: testUrl,
        count: 3
      },
      timeout: 15000
    });
    
    if (response.data) {
      console.log(`   📡 RSS2JSON Response Status: ${response.data.status}`);
      if (response.data.status === 'ok' && response.data.items) {
        console.log(`   ✅ Success: Got ${response.data.items.length} articles`);
        console.log(`   📝 First article: ${response.data.items[0]?.title || 'No title'}`);
      } else if (response.data.status === 'error') {
        console.log(`   ❌ RSS2JSON Error: ${response.data.message}`);
      }
    }
    
  } catch (error) {
    console.log(`   ❌ RSS2JSON test failed: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 Starting RSS Feed Tests...\n');
  
  // Test RSS2JSON first
  await testRSS2JSON();
  
  // Test individual feeds
  console.log('\n📰 Testing Individual RSS Feeds...');
  for (const feed of testFeeds) {
    await testRSSFeed(feed);
  }
  
  console.log('\n✅ RSS Feed Tests Complete!');
}

runTests().catch(console.error);



