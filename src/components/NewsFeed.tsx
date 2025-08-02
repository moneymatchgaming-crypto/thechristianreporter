import React from 'react';
import { NewsArticle } from '../types';
import NewsCard from './NewsCard';

interface NewsFeedProps {
  articles: NewsArticle[];
  loading: boolean;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ articles, loading }) => {

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading news articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* News Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No articles available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed; 