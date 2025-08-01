import React, { useState, useEffect } from 'react';
import { ChurchEvent } from '../types';
import { getChurchEvents } from '../services/api';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const ChurchEvents: React.FC = () => {
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await getChurchEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching church events:', error);
        // Fallback data
        setEvents([
          {
            id: '1',
            title: 'Sunday Worship Service',
            description: 'Join us for worship, prayer, and fellowship every Sunday morning.',
            date: new Date(Date.now() + 86400000).toISOString(),
            location: 'Main Sanctuary',
            church: 'Grace Community Church',
            type: 'service'
          },
          {
            id: '2',
            title: 'Youth Group Meeting',
            description: 'Weekly youth group for teens with games, Bible study, and fellowship.',
            date: new Date(Date.now() + 172800000).toISOString(),
            location: 'Youth Center',
            church: 'Grace Community Church',
            type: 'youth'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getEventTypeColor = (type: string) => {
    const colors = {
      'service': 'bg-blue-100 text-blue-800',
      'conference': 'bg-purple-100 text-purple-800',
      'outreach': 'bg-green-100 text-green-800',
      'youth': 'bg-pink-100 text-pink-800',
      'worship': 'bg-gold-100 text-gold-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'service':
        return <Users className="w-4 h-4" />;
      case 'conference':
        return <Users className="w-4 h-4" />;
      case 'outreach':
        return <MapPin className="w-4 h-4" />;
      case 'youth':
        return <Users className="w-4 h-4" />;
      case 'worship':
        return <Users className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) return 'Past';
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Tomorrow';
    if (diffInDays < 7) return `In ${diffInDays} days`;
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const isUpcoming = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    return date.getTime() > now.getTime();
  };

  const upcomingEvents = events.filter(event => isUpcoming(event.date));

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="w-6 h-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Church Events</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <section id="events" className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Calendar className="w-6 h-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Church Events</h3>
      </div>

      {upcomingEvents.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No upcoming events</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingEvents.slice(0, 5).map((event) => (
            <article key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                  <div className="flex items-center space-x-1">
                    {getEventTypeIcon(event.type)}
                    <span>{event.type}</span>
                  </div>
                </span>
                <div className="flex items-center space-x-1 text-gray-500 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(event.date)}</span>
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {event.title}
              </h4>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {event.description}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{event.location}</span>
                </div>
                <span className="font-medium">{event.church}</span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button className="text-primary-600 hover:text-primary-800 text-xs font-medium">
                  Add to Calendar
                </button>
                <button className="text-primary-600 hover:text-primary-800 text-xs font-medium">
                  Share Event
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {upcomingEvents.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            View All Events
          </button>
        </div>
      )}

      <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <div className="text-center">
          <Calendar className="w-8 h-8 mx-auto text-primary-600 mb-2" />
          <p className="text-sm text-primary-800 font-medium mb-2">
            Submit an Event
          </p>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-colors">
            Add Your Event
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChurchEvents; 