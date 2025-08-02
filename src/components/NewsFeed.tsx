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
      console.log('📰 NewsFeed: Fetching articles for page', pageNum);
      
      // Use the new API service with pagination simulation
      const allArticles = await getNews();
      
      // Simulate pagination: show 12 articles per page
      const articlesPerPage = 12;
      const startIndex = (pageNum - 1) * articlesPerPage;
      const endIndex = startIndex + articlesPerPage;
      const pageArticles = allArticles.slice(startIndex, endIndex);
      
      if (pageNum === 1) {
        setArticles(pageArticles);
      } else {
        setArticles(prev => [...prev, ...pageArticles]);
      }
      
      // Check if there are more articles
      setHasMore(endIndex < allArticles.length);
      console.log('📰 NewsFeed: Loaded', pageArticles.length, 'articles for page', pageNum);
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

      {articles.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">No articles available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed; 