import React, { useState, useEffect } from 'react';
import { Play, Heart, MessageCircle, ExternalLink, Youtube, Music } from 'lucide-react';

interface SocialMediaPost {
  id: string;
  platform: 'youtube' | 'tiktok';
  title: string;
  description: string;
  author: string;
  authorAvatar?: string;
  thumbnail?: string;
  url: string;
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
  duration?: string;
  isPodcast?: boolean;
}

const ChristianSocialMedia: React.FC = () => {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'youtube' | 'tiktok'>('all');
  const [apiQuotaExceeded, setApiQuotaExceeded] = useState(false);

  useEffect(() => {
    const fetchSocialMediaContent = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching Christian social media content...');
        const response = await fetch('/api/christian-social-media');
        const data = await response.json();
        console.log('✅ Received data:', data);
        setPosts(data.posts || []);
      } catch (error) {
        console.error('❌ Error fetching social media content:', error);
        // Check if it's a quota exceeded error
        if (error instanceof Error && error.message.includes('quota')) {
          setApiQuotaExceeded(true);
        }
        // Fallback data with Christian content (YouTube only)
        setPosts([
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
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchSocialMediaContent();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const parseDurationToMinutes = (duration: string) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 0;

    let totalMinutes = 0;
    if (match[1]) totalMinutes += parseInt(match[1].replace('H', '')) * 60;
    if (match[2]) totalMinutes += parseInt(match[2].replace('M', ''));
    if (match[3]) totalMinutes += Math.ceil(parseInt(match[3].replace('S', '')) / 60);

    return totalMinutes;
  };

  const getPlatformIcon = (platform: string) => {
    return platform === 'youtube' ? <Youtube className="w-4 h-4" /> : <Music className="w-4 h-4" />;
  };

  const getPlatformColor = (platform: string) => {
    return platform === 'youtube' ? 'text-red-600 bg-red-100' : 'text-pink-600 bg-pink-100';
  };

  const filteredPosts = posts.filter(post => 
    selectedPlatform === 'all' || post.platform === selectedPlatform
  );

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Play className="w-6 h-6 text-faith-600" />
          <h3 className="text-lg font-semibold text-gray-900">Christian Social Media</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Play className="w-6 h-6 text-faith-600" />
          <h3 className="text-lg font-semibold text-gray-900">Christian Social Media</h3>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value as 'all' | 'youtube' | 'tiktok')}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 text-gray-900 bg-white"
          >
            <option value="all">All Videos</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>
      </div>

      {apiQuotaExceeded && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-600">⚠️</span>
            <span className="text-sm text-yellow-800">
              YouTube API quota exceeded. Showing example content. Real videos will appear when quota resets.
            </span>
          </div>
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <div className="text-center py-8">
          <Play className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No social media content available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.slice(0, 5).map((post) => (
            <article key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                {/* Thumbnail */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    {post.thumbnail ? (
                      <img 
                        src={post.thumbnail} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  {post.duration && (
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                      {post.duration}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(post.platform)}`}>
                      <div className="flex items-center space-x-1">
                        {getPlatformIcon(post.platform)}
                        <span>YouTube</span>
                      </div>
                    </span>
                    {post.isPodcast && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        🎧 Podcast
                      </span>
                    )}
                    {!post.isPodcast && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        ⛪ Worship Service
                      </span>
                    )}
                    {post.duration && parseDurationToMinutes(post.duration) >= 20 && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ⏱️ Long Form
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(post.publishedAt)}
                    </span>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">
                    {post.title}
                  </h4>
                  
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-2 mb-2">
                    {post.authorAvatar && (
                      <img 
                        src={post.authorAvatar} 
                        alt={post.author}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span className="text-xs font-medium text-gray-700">{post.author}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Play className="w-3 h-3" />
                      <span>{formatNumber(post.views)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{formatNumber(post.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{formatNumber(post.comments)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-primary-600 hover:text-primary-800 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Watch</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {filteredPosts.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            View More Content
          </button>
        </div>
      )}
    </section>
  );
};

export default ChristianSocialMedia; 