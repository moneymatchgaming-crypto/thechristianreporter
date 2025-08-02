import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import NewsCard from './NewsCard';
import { ChevronDown } from 'lucide-react';
import { getNews } from '../services/api';

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async (pageNum: number) => {
    try {
      setLoading(true);
      console.log('📰 NewsFeed: Fetching articles...');
      
      // Use the new API service instead of calling /api/news
      const articles = await getNews();
      
      if (pageNum === 1) {
        setArticles(articles);
      } else {
        setArticles(prev => [...prev, ...articles]);
      }
      
      // For now, just show all articles (no pagination)
      setHasMore(false);
      console.log('📰 NewsFeed: Loaded', articles.length, 'articles');
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(nextPage);
  };

  return (
    <div className="space-y-6">
      {/* News Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 text-sm font-medium text-purple-600 hover:text-purple-800 bg-purple-200 hover:bg-purple-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mx-auto border border-purple-300"
          >
            <ChevronDown className="w-4 h-4" />
            <span>{loading ? 'Loading...' : 'Load More Articles'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsFeed; 