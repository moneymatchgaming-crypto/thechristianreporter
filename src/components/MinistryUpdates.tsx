import React, { useState, useEffect } from 'react';
import { MinistryUpdate } from '../types';
import { getMinistryUpdates } from '../services/api';
import { Heart, Globe, MapPin, Clock } from 'lucide-react';

const MinistryUpdates: React.FC = () => {
  const [updates, setUpdates] = useState<MinistryUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        const updatesData = await getMinistryUpdates();
        setUpdates(updatesData);
      } catch (error) {
        console.error('Error fetching ministry updates:', error);
        // Fallback data
        setUpdates([
          {
            id: '1',
            title: 'Local Church Opens Food Pantry',
            description: 'Grace Community Church has opened a new food pantry to serve families in need.',
            ministry: 'Grace Community Church',
            date: new Date().toISOString(),
            impact: 'local',
            category: 'social-justice'
          },
          {
            id: '2',
            title: 'Mission Trip to Kenya Announced',
            description: 'Youth group planning summer mission trip to support orphanage in Nairobi.',
            ministry: 'Youth Ministry',
            date: new Date(Date.now() - 86400000).toISOString(),
            impact: 'global',
            category: 'evangelism'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'global':
        return <Globe className="w-4 h-4" />;
      case 'national':
        return <MapPin className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'global':
        return 'text-blue-600 bg-blue-100';
      case 'national':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'evangelism': 'bg-gold-100 text-gold-800',
      'disaster-relief': 'bg-red-100 text-red-800',
      'education': 'bg-blue-100 text-blue-800',
      'healthcare': 'bg-green-100 text-green-800',
      'social-justice': 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Heart className="w-6 h-6 text-faith-600" />
          <h3 className="text-lg font-semibold text-gray-900">Ministry Updates</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <section id="ministry" className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Heart className="w-6 h-6 text-faith-600" />
        <h3 className="text-lg font-semibold text-gray-900">Ministry Updates</h3>
      </div>

      {updates.length === 0 ? (
        <div className="text-center py-8">
          <Heart className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No ministry updates available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {updates.slice(0, 5).map((update) => (
            <article key={update.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(update.category)}`}>
                    {update.category.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(update.impact)}`}>
                    <div className="flex items-center space-x-1">
                      {getImpactIcon(update.impact)}
                      <span>{update.impact}</span>
                    </div>
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(update.date)}</span>
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {update.title}
              </h4>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {update.description}
              </p>

              <div className="text-xs text-gray-500">
                <span className="font-medium">{update.ministry}</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {updates.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            View All Updates
          </button>
        </div>
      )}
    </section>
  );
};

export default MinistryUpdates; 