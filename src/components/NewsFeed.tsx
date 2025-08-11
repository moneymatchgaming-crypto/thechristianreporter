import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import NewsCard from './NewsCard';
import { ChevronDown, Filter } from 'lucide-react';
import { getNews } from '../services/api';
import { getCategoriesInGroup, categoryGroups } from '../utils/categoryGroups';

interface NewsFeedProps {
  selectedCategory?: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ selectedCategory }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      console.log('📰 NewsFeed: Fetching articles for page', pageNum);
      
      // Use the new API service with pagination simulation
      const allArticles = await getNews();
      
      if (!allArticles || allArticles.length === 0) {
        throw new Error('No articles received from API');
      }
      
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
    } catch (err: any) {
      console.error('Error fetching news:', err);
      setError(err.message || 'Failed to fetch news articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(1);
  }, []);

  // Filter articles based on selected category
  useEffect(() => {
    if (!selectedCategory || selectedCategory === 'news') {
      setFilteredArticles(articles);
      return;
    }

    const categoriesInGroup = getCategoriesInGroup(selectedCategory);
    const filtered = articles.filter(article => 
      categoriesInGroup.includes(article.category.toLowerCase())
    );
    
    console.log(`🎯 NewsFeed: Filtering articles for category group "${selectedCategory}":`, {
      totalArticles: articles.length,
      filteredCount: filtered.length,
      categoriesInGroup
    });
    
    setFilteredArticles(filtered);
  }, [articles, selectedCategory]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(nextPage);
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategory || selectedCategory === 'news') return null;
    return categoryGroups.find(group => group.id === selectedCategory)?.name;
  };

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-red-800">Error loading news</h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
            <button
              onClick={() => fetchArticles(1)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Filter Indicator */}
      {selectedCategory && selectedCategory !== 'news' && (
        <div className="flex items-center space-x-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Filter className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            Showing articles from: <span className="font-semibold">{getSelectedCategoryName()}</span>
          </span>
        </div>
      )}

      {/* Loading State */}
      {loading && page === 1 && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading news articles...</p>
        </div>
      )}

      {/* News Grid Section */}
      {!loading && filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && filteredArticles.length > 0 && (
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

      {filteredArticles.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            {selectedCategory 
              ? `No articles available in the "${getSelectedCategoryName()}" category.` 
              : 'No articles available at the moment.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed; 