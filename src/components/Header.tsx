import React from 'react';
import { CacheStatus } from '../types';
import { RefreshCw, BookOpen, Cross, Users, Globe, Heart } from 'lucide-react';
import { categoryGroups } from '../utils/categoryGroups';

interface HeaderProps {
  cacheStatus?: CacheStatus | null;
  selectedCategory?: string;
  onCategorySelect?: (categoryId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cacheStatus, selectedCategory, onCategorySelect }) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'book-open':
        return <BookOpen className="w-4 h-4" />;
      case 'cross':
        return <Cross className="w-4 h-4" />;
      case 'users':
        return <Users className="w-4 h-4" />;
      case 'globe':
        return <Globe className="w-4 h-4" />;
      case 'heart':
        return <Heart className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = "flex items-center space-x-2 transition-colors";
    const selectedClasses = "font-semibold";
    
    switch (color) {
      case 'gray':
        return `${baseClasses} ${isSelected ? 'text-gray-700' : 'text-gray-600 hover:text-gray-800'} ${isSelected ? selectedClasses : ''}`;
      case 'primary':
        return `${baseClasses} ${isSelected ? 'text-primary-700' : 'text-primary-600 hover:text-primary-800'} ${isSelected ? selectedClasses : ''}`;
      case 'gold':
        return `${baseClasses} ${isSelected ? 'text-gold-700' : 'text-gold-600 hover:text-gold-800'} ${isSelected ? selectedClasses : ''}`;
      case 'red':
        return `${baseClasses} ${isSelected ? 'text-red-700' : 'text-red-600 hover:text-red-800'} ${isSelected ? selectedClasses : ''}`;
      case 'green':
        return `${baseClasses} ${isSelected ? 'text-green-700' : 'text-green-600 hover:text-green-800'} ${isSelected ? selectedClasses : ''}`;
      default:
        return `${baseClasses} ${isSelected ? 'text-gray-700' : 'text-gray-600 hover:text-gray-800'} ${isSelected ? selectedClasses : ''}`;
    }
  };

  const handleLogoClick = () => {
    onCategorySelect?.('news');
  };

  return (
    <header className="bg-white shadow-lg border-b border-primary-200">
      <div className="container mx-auto px-4 py-6">
        {/* Main Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-4 hover:opacity-80 transition-opacity cursor-pointer"
              title="Click to view all news"
            >
              <div className="cross-glow">
                <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-serif">
                  The Christian Reporter
                </h1>
                <p className="text-gray-600 text-sm">
                  Faith-based news & Christian content
                </p>
              </div>
            </button>
          </div>

          {/* Cache Status */}
          {cacheStatus && (
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-primary-600" />
                <span>Last updated: {formatTime(cacheStatus.lastUpdated)}</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-faith-600" />
                <span>{cacheStatus.totalArticles} articles</span>
              </div>
            </div>
          )}
        </div>

        {/* Category Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm font-medium">
          {categoryGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => onCategorySelect?.(group.id)}
              className={getColorClasses(group.color, selectedCategory === group.id)}
              title={group.description}
            >
              {getIcon(group.icon)}
              <span>{group.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header; 