import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Filter } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  ministry: string;
  contact: string;
  registration: boolean;
  recurring: string;
}

const EventsCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMinistry, setSelectedMinistry] = useState<string>('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // Load events from localStorage
        const localEvents = JSON.parse(localStorage.getItem('localEvents') || '[]');
        
        // Use local events if available, otherwise use fallback data
        let allEvents = localEvents;
        if (localEvents.length === 0) {
          allEvents = [
            {
              id: "1",
              title: "Youth Group Bible Study",
              description: "Weekly Bible study for high school students. We'll be studying the book of Romans.",
              date: "2025-08-15",
              time: "18:00",
              duration: 90,
              location: "Church Fellowship Hall",
              ministry: "youth",
              contact: "Pastor Mike",
              registration: false,
              recurring: "weekly"
            },
            {
              id: "2",
              title: "Worship Team Practice",
              description: "Weekly worship team rehearsal for Sunday service",
              date: "2025-08-16",
              time: "19:00",
              duration: 120,
              location: "Sanctuary",
              ministry: "worship",
              contact: "Music Director Sarah",
              registration: false,
              recurring: "weekly"
            }
          ];
          
          // Save fallback data to localStorage
          localStorage.setItem('localEvents', JSON.stringify(allEvents));
        }
        
        setEvents(allEvents);
      } catch (error) {
        console.error('Error loading events:', error);
        // Fallback to sample data
        setEvents([
          {
            id: "1",
            title: "Youth Group Bible Study",
            description: "Weekly Bible study for high school students. We'll be studying the book of Romans.",
            date: "2025-08-15",
            time: "18:00",
            duration: 90,
            location: "Church Fellowship Hall",
            ministry: "youth",
            contact: "Pastor Mike",
            registration: false,
            recurring: "weekly"
          },
          {
            id: "2",
            title: "Worship Team Practice",
            description: "Weekly worship team rehearsal for Sunday service",
            date: "2025-08-16",
            time: "19:00",
            duration: 120,
            location: "Sanctuary",
            ministry: "worship",
            contact: "Music Director Sarah",
            registration: false,
            recurring: "weekly"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getMinistryColor = (ministry: string) => {
    const colors = {
      'youth': 'bg-blue-100 text-blue-800',
      'worship': 'bg-purple-100 text-purple-800',
      'outreach': 'bg-green-100 text-green-800',
      'prayer': 'bg-gold-100 text-gold-800',
      'children': 'bg-pink-100 text-pink-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[ministry as keyof typeof colors] || colors.default;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= nextWeek;
      })
      .filter(event => selectedMinistry === 'all' || event.ministry === selectedMinistry)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const ministries = ['all', ...Array.from(new Set(events.map(e => e.ministry)))];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="w-6 h-6 text-faith-600" />
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  const upcomingEvents = getUpcomingEvents();

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-faith-600" />
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={selectedMinistry}
            onChange={(e) => setSelectedMinistry(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 text-gray-900 bg-white"
          >
            {ministries.map(ministry => (
              <option key={ministry} value={ministry}>
                {ministry === 'all' ? 'All Ministries' : ministry.charAt(0).toUpperCase() + ministry.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {upcomingEvents.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No upcoming events</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <article key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMinistryColor(event.ministry)}`}>
                    {event.ministry}
                  </span>
                  {event.registration && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Registration Required
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(event.date)}
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-2">
                {event.title}
              </h4>
              
              <p className="text-gray-600 text-sm mb-3">
                {event.description}
              </p>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(event.time)} ({event.duration} min)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Contact: {event.contact}</span>
                  </div>
                  {event.registration && (
                    <button className="bg-faith-600 text-white px-3 py-1 rounded text-sm hover:bg-faith-700 transition-colors">
                      Register
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button className="text-faith-600 hover:text-faith-800 text-sm font-medium">
          View Full Calendar
        </button>
      </div>
    </section>
  );
};

export default EventsCalendar; 