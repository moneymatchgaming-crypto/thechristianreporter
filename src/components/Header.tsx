import React from 'react';
import { CacheStatus } from '../types';
import { RefreshCw, BookOpen, Users, Calendar } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  cacheStatus?: CacheStatus | null;
}

const Header: React.FC<HeaderProps> = ({ cacheStatus }) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <header className="bg-white shadow-lg border-b border-primary-200">
      <div className="container mx-auto px-4 py-6">
        {/* Main Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Logo 
              variant="default" 
              size="lg" 
              onClick={() => window.location.href = '#news'}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
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

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center space-x-8 text-sm font-medium">
          <a href="#news" className="flex items-center space-x-2 text-primary-700 hover:text-primary-900 transition-colors">
            <BookOpen className="w-4 h-4" />
            <span>News</span>
          </a>
          <a href="#prayer" className="flex items-center space-x-2 text-gold-700 hover:text-gold-900 transition-colors">
            <Users className="w-4 h-4" />
            <span>Prayer</span>
          </a>
          <a href="#social-media" className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>Social Media</span>
          </a>
          <a href="#events" className="flex items-center space-x-2 text-primary-700 hover:text-primary-900 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Events</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header; 