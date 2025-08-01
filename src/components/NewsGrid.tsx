import React, { useState } from 'react';
import { NewsArticle } from '../types';
import NewsCard from './NewsCard';
import { BookOpen, ChevronDown } from 'lucide-react';

interface NewsGridProps {
  articles: NewsArticle[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ articles }) => {
  const [displayCount, setDisplayCount] = useState(20);

  if (articles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No News Available</h3>
        <p className="text-gray-500">
          We're currently updating our news feed. Please check back soon.
        </p>
      </div>
    );
  }

  const displayedArticles = articles.slice(0, displayCount);
  const hasMore = displayCount < articles.length;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 20, articles.length));
  };

  return (
    <section id="news" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-primary-600" />
          <span>Latest Christian News</span>
        </h2>
        <span className="text-sm text-gray-500">
          Showing {displayedArticles.length} of {articles.length} articles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedArticles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center pt-6">
          <button
            onClick={loadMore}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <ChevronDown className="w-5 h-5" />
            <span>Load More Articles</span>
          </button>
        </div>
      )}

      {articles.length > 0 && (
        <div className="text-center pt-6">
          <p className="text-gray-600 text-sm">
            News updates automatically every 8 minutes
          </p>
        </div>
      )}
    </section>
  );
};

export default NewsGrid; 