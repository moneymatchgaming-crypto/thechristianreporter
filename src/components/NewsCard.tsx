import React from 'react';
import { NewsArticle } from '../types';
import { Calendar, ExternalLink, Clock } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'church': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'ministry': 'bg-green-500/20 text-green-400 border-green-500/30',
      'youth': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'family': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'missions': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'worship': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'faith': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'social-justice': 'bg-red-500/20 text-red-400 border-red-500/30',
      'music': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      'catholic': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      'news': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      'apologetics': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      'culture': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'default': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[category.toLowerCase() as keyof typeof colors] || colors.default;
  };

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg cursor-pointer">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop';
            }}
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(article.category)}`}>
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.description}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(article.pubDate)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-3 h-3" />
              <span>{formatTime(article.pubDate)}</span>
            </div>
          </div>

          {/* Source and Read More */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-600 font-medium">
              {article.source}
            </span>
            <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
              <span className="text-sm">Read More</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </div>
      </article>
    </a>
  );
};

export default NewsCard; 