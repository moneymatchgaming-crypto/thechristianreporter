require('dotenv').config();
const axios = require('axios');

async function testYouTubeAPI() {
  try {
    console.log('🔍 Testing YouTube API directly...');
    
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    console.log('API Key configured:', !!YOUTUBE_API_KEY);
    
    // Test podcast search
    console.log('📡 Testing podcast search...');
    const podcastResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: 'Christian Podcast',
        type: 'video',
        maxResults: 1,
        order: 'relevance',
        publishedAfter: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        key: YOUTUBE_API_KEY
      },
      timeout: 10000
    });

    if (podcastResponse.data.items && podcastResponse.data.items.length > 0) {
      const videoId = podcastResponse.data.items[0].id.videoId;
      console.log('✅ Found podcast video:', videoId);
      
      // Get video details
      const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: videoId,
          key: YOUTUBE_API_KEY
        },
        timeout: 10000
      });

      if (videoResponse.data.items && videoResponse.data.items.length > 0) {
        const video = videoResponse.data.items[0];
        console.log('📺 Podcast Details:');
        console.log('  Title:', video.snippet.title);
        console.log('  Channel:', video.snippet.channelTitle);
        console.log('  Duration:', video.contentDetails.duration);
        console.log('  Views:', video.statistics?.viewCount);
      }
    }

    // Test worship service search
    console.log('📡 Testing worship service search...');
    const worshipResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: 'worship service',
        type: 'video',
        maxResults: 1,
        order: 'relevance',
        publishedAfter: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        key: YOUTUBE_API_KEY
      },
      timeout: 10000
    });

    if (worshipResponse.data.items && worshipResponse.data.items.length > 0) {
      const videoId = worshipResponse.data.items[0].id.videoId;
      console.log('✅ Found worship service video:', videoId);
      
      // Get video details
      const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: videoId,
          key: YOUTUBE_API_KEY
        },
        timeout: 10000
      });

      if (videoResponse.data.items && videoResponse.data.items.length > 0) {
        const video = videoResponse.data.items[0];
        console.log('📺 Worship Service Details:');
        console.log('  Title:', video.snippet.title);
        console.log('  Channel:', video.snippet.channelTitle);
        console.log('  Duration:', video.contentDetails.duration);
        console.log('  Views:', video.statistics?.viewCount);
      }
    }

    console.log('🎉 YouTube API test completed successfully!');

  } catch (error) {
    console.error('❌ Error testing YouTube API:', error.response?.data || error.message);
  }
}

testYouTubeAPI();





