import axios from 'axios';

// YouTube API Configuration
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export interface YouTubeVideo {
  id: string;
  platform: 'youtube';
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  thumbnail: string;
  url: string;
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
  duration: string;
  isPodcast: boolean;
}

export const getChristianYouTubeContent = async (): Promise<YouTubeVideo[]> => {
  console.log('🔍 Fetching Christian YouTube content from frontend...');
  
  if (!YOUTUBE_API_KEY) {
    console.log('⚠️ YouTube API key not configured in frontend');
    return [];
  }

  // Check for global daily cache (same videos for everyone)
  const today = new Date().toDateString();
  const cacheKey = `youtube-cache-${today}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    console.log('📦 Serving today\'s cached YouTube content');
    return JSON.parse(cached);
  }

  try {
    const videos: YouTubeVideo[] = [];
    
    // Fetch 1 Christian podcast
    console.log('📡 Fetching Christian podcast...');
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
      
      // Get detailed video information
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

          const post: YouTubeVideo = {
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
          
          videos.push(post);
          console.log('✅ Found 1 podcast');
        }
      }
    }

    // Fetch 1 worship service
    console.log('📡 Fetching worship service...');
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
      
      // Get detailed video information
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

          const post: YouTubeVideo = {
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
          
          videos.push(post);
          console.log('✅ Found 1 worship service');
        }
      }
    }

    console.log(`📊 Found ${videos.length} YouTube videos`);
    
    // Cache the results for today (same for everyone)
    if (videos.length > 0) {
      localStorage.setItem(cacheKey, JSON.stringify(videos));
      console.log('💾 Cached today\'s YouTube content for all visitors');
    }
    
    return videos;

  } catch (error: any) {
    console.error('❌ Error fetching YouTube content:', error.response?.data || error.message);
    return [];
  }
};

// Helper function to parse duration to seconds
const parseDurationToSeconds = (duration: string): number => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  return hours * 3600 + minutes * 60 + seconds;
};

// Helper function to get best thumbnail URL
const getBestThumbnailUrl = (videoId: string, thumbnails: any): string => {
  if (thumbnails?.maxres?.url) return thumbnails.maxres.url;
  if (thumbnails?.high?.url) return thumbnails.high.url;
  if (thumbnails?.medium?.url) return thumbnails.medium.url;
  if (thumbnails?.default?.url) return thumbnails.default.url;
  
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};
