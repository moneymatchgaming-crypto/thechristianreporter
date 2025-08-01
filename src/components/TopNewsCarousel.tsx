import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { ChevronLeft, ChevronRight, ExternalLink, Clock } from 'lucide-react';

interface TopNewsCarouselProps {
  articles: NewsArticle[];
}

const TopNewsCarousel: React.FC<TopNewsCarouselProps> = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length, isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true 
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  if (articles.length === 0) return null;

  const currentArticle = articles[currentIndex];

  return (
    <section 
      className="relative bg-white rounded-lg shadow-lg overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-96 md:h-[500px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          {currentArticle.imageUrl ? (
            <img 
              src={currentArticle.imageUrl} 
              alt={currentArticle.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-600 via-faith-600 to-gold-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="cross-glow mb-4">
                  <svg className="w-24 h-24 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <div className="text-2xl font-bold mb-2">{currentArticle.category}</div>
                <div className="text-lg opacity-90">Christian News</div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-6 md:p-8 text-white">
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                  {currentArticle.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-4xl font-bold mb-4 line-clamp-2">
                <a 
                  href={currentArticle.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-200 transition-colors"
                >
                  {currentArticle.title}
                </a>
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl mb-6 text-gray-200 line-clamp-2">
                {truncateText(currentArticle.description, 200)}
              </p>

              {/* Meta Information */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(currentArticle.pubDate)}</span>
                  </div>
                  <span className="font-medium">{currentArticle.source}</span>
                </div>

                <a 
                  href={currentArticle.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <span>Read Full Story</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {articles.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Previous article"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Next article"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {articles.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to article ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TopNewsCarousel; 