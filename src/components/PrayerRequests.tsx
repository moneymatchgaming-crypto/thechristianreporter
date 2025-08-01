import React, { useState, useEffect } from 'react';
import { PrayerRequest } from '../types';
import { getPrayerRequests } from '../services/api';
import { Users, Clock, AlertCircle, Heart } from 'lucide-react';

const PrayerRequests: React.FC = () => {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const requestsData = await getPrayerRequests();
        setRequests(requestsData);
      } catch (error) {
        console.error('Error fetching prayer requests:', error);
        // Fallback data
        setRequests([
          {
            id: '1',
            title: 'Prayer for Healing',
            description: 'Please pray for Sarah who is recovering from surgery.',
            category: 'health',
            urgency: 'high',
            date: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Mission Team Safety',
            description: 'Praying for our mission team serving in Guatemala.',
            category: 'missions',
            urgency: 'medium',
            date: new Date(Date.now() - 86400000).toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default:
        return 'text-green-600 bg-green-100 border-green-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <Heart className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'health': 'bg-blue-100 text-blue-800',
      'family': 'bg-purple-100 text-purple-800',
      'missions': 'bg-gold-100 text-gold-800',
      'church': 'bg-green-100 text-green-800',
      'community': 'bg-pink-100 text-pink-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.default;
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
          <Users className="w-6 h-6 text-gold-600" />
          <h3 className="text-lg font-semibold text-gray-900">Prayer Requests</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <section id="prayer" className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="w-6 h-6 text-gold-600" />
        <h3 className="text-lg font-semibold text-gray-900">Prayer Requests</h3>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No prayer requests available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.slice(0, 5).map((request) => (
            <article key={request.id} className={`border rounded-lg p-4 ${getUrgencyColor(request.urgency)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(request.category)}`}>
                    {request.category}
                  </span>
                  <span className="flex items-center space-x-1 text-xs font-medium">
                    {getUrgencyIcon(request.urgency)}
                    <span>{request.urgency}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs opacity-75">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(request.date)}</span>
                </div>
              </div>

              <h4 className="font-semibold mb-2 line-clamp-2">
                {request.title}
              </h4>
              
              <p className="text-sm mb-3 line-clamp-2 opacity-90">
                {request.description}
              </p>

              <div className="flex items-center justify-between">
                <button className="text-xs font-medium hover:underline">
                  I'm Praying
                </button>
                <button className="text-xs font-medium hover:underline">
                  Share
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {requests.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            View All Requests
          </button>
        </div>
      )}

      <div className="mt-6 p-4 bg-gold-50 rounded-lg border border-gold-200">
        <div className="text-center">
          <Heart className="w-8 h-8 mx-auto text-gold-600 mb-2" />
          <p className="text-sm text-gold-800 font-medium mb-2">
            Submit a Prayer Request
          </p>
          <button className="bg-gold-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gold-700 transition-colors">
            Share Your Request
          </button>
        </div>
      </div>
    </section>
  );
};

export default PrayerRequests; 