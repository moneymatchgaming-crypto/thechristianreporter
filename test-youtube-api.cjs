// Test YouTube API Integration
require('dotenv').config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

console.log('🔍 Testing YouTube API Integration...');
console.log('API Key configured:', YOUTUBE_API_KEY ? 'YES' : 'NO');
console.log('API Key (first 10 chars):', YOUTUBE_API_KEY ? YOUTUBE_API_KEY.substring(0, 10) + '...' : 'NOT SET');

if (!YOUTUBE_API_KEY) {
  console.log('❌ No YouTube API key found in .env file');
  process.exit(1);
}

async function testYouTubeAPI() {
  try {
    console.log('\n📡 Testing YouTube API search...');
    
    // Test search for Christian content
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=christian%20devotional&order=date&maxResults=3&type=video&key=${YOUTUBE_API_KEY}`;
    
    console.log('Making request to:', searchUrl.substring(0, 100) + '...');
    
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    if (data.error) {
      console.log('❌ YouTube API Error:', data.error.message);
      console.log('Error Code:', data.error.code);
      return false;
    }
    
    if (data.items && data.items.length > 0) {
      console.log('✅ YouTube API is working!');
      console.log('Found', data.items.length, 'videos');
      
      data.items.forEach((item, index) => {
        console.log(`\n📺 Video ${index + 1}:`);
        console.log('  Title:', item.snippet.title);
        console.log('  Channel:', item.snippet.channelTitle);
        console.log('  Published:', item.snippet.publishedAt);
        console.log('  Video ID:', item.id.videoId);
      });
      
      return true;
    } else {
      console.log('⚠️  No videos found (this might be normal)');
      return true;
    }
    
  } catch (error) {
    console.log('❌ Error testing YouTube API:', error.message);
    return false;
  }
}

async function testVideoDetails() {
  try {
    console.log('\n📡 Testing video details API...');
    
    // Use a known video ID for testing
    const videoId = 'dQw4w9WgXcQ'; // Rick Roll (for testing)
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails,snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;
    
    const response = await fetch(videoUrl);
    const data = await response.json();
    
    if (data.error) {
      console.log('❌ Video Details API Error:', data.error.message);
      return false;
    }
    
    if (data.items && data.items.length > 0) {
      console.log('✅ Video Details API is working!');
      const video = data.items[0];
      console.log('  Title:', video.snippet.title);
      console.log('  Views:', video.statistics.viewCount);
      console.log('  Likes:', video.statistics.likeCount);
      console.log('  Duration:', video.contentDetails.duration);
      return true;
    } else {
      console.log('⚠️  No video details found');
      return false;
    }
    
  } catch (error) {
    console.log('❌ Error testing video details:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting YouTube API Tests...\n');
  
  const searchTest = await testYouTubeAPI();
  const detailsTest = await testVideoDetails();
  
  console.log('\n📊 Test Results:');
  console.log('Search API:', searchTest ? '✅ PASS' : '❌ FAIL');
  console.log('Details API:', detailsTest ? '✅ PASS' : '❌ FAIL');
  
  if (searchTest && detailsTest) {
    console.log('\n🎉 All tests passed! Your YouTube API is working correctly.');
    console.log('The issue with the server is likely elsewhere.');
  } else {
    console.log('\n⚠️  Some tests failed. Check your API key and permissions.');
  }
}

runTests(); 