import React, { useState, useEffect } from 'react';
import { Users, Clock, AlertCircle, Heart, TrendingUp, Plus, X } from 'lucide-react';

interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: 'high' | 'medium' | 'low';
  date: string;
  anonymous: boolean;
  email?: string;
  prayerCount: number;
}

interface PrayerAnalytics {
  totalRequests: number;
  trendingTopics: string[];
  recentActivity: number;
  topCategories: { category: string; count: number }[];
}

const SmartPrayerRequests: React.FC = () => {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [analytics, setAnalytics] = useState<PrayerAnalytics | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [prayedRequests, setPrayedRequests] = useState<Set<string>>(new Set());

  // Load prayed requests from localStorage on component mount
  useEffect(() => {
    const savedPrayedRequests = localStorage.getItem('prayedRequests');
    if (savedPrayedRequests) {
      setPrayedRequests(new Set(JSON.parse(savedPrayedRequests)));
    }
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    urgency: 'medium' as 'high' | 'medium' | 'low',
    anonymous: false,
    email: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Load prayer requests from localStorage
        const localRequests = JSON.parse(localStorage.getItem('localPrayerRequests') || '[]');
        
        // Combine local requests with fallback data if no local data exists
        let allRequests = localRequests;
        if (localRequests.length === 0) {
          allRequests = [
            {
              id: '1',
              title: 'Prayer for Healing',
              description: 'Please pray for Sarah who is recovering from surgery.',
              category: 'health',
              urgency: 'high',
              date: new Date().toISOString(),
              anonymous: false,
              prayerCount: 12
            },
            {
              id: '2',
              title: 'Mission Team Safety',
              description: 'Praying for our mission team serving in Guatemala.',
              category: 'missions',
              urgency: 'medium',
              date: new Date(Date.now() - 86400000).toISOString(),
              anonymous: false,
              prayerCount: 8
            },
            {
              id: '3',
              title: 'Family Reconciliation',
              description: 'Praying for healing in family relationships.',
              category: 'family',
              urgency: 'medium',
              date: new Date(Date.now() - 172800000).toISOString(),
              anonymous: false,
              prayerCount: 15
            }
          ];
          
          // Save fallback data to localStorage
          localStorage.setItem('localPrayerRequests', JSON.stringify(allRequests));
        }
        
        setRequests(allRequests);
        
        // Load prayed requests from localStorage
        const savedPrayedRequests = localStorage.getItem('prayedRequests');
        if (savedPrayedRequests) {
          const localPrayedRequests = new Set(JSON.parse(savedPrayedRequests) as string[]);
          setPrayedRequests(localPrayedRequests);
        }
        
        // Calculate analytics from requests
        const totalRequests = allRequests.length;
        const recentActivity = allRequests.filter((req: PrayerRequest) => {
          const reqDate = new Date(req.date);
          const now = new Date();
          const diffInDays = (now.getTime() - reqDate.getTime()) / (1000 * 60 * 60 * 24);
          return diffInDays <= 7;
        }).length;
        
        const categoryCounts = allRequests.reduce((acc: { [key: string]: number }, req: PrayerRequest) => {
          acc[req.category] = (acc[req.category] || 0) + 1;
          return acc;
        }, {});
        
        const topCategories = Object.entries(categoryCounts)
          .map(([category, count]) => ({ category, count: count as number }))
          .sort((a, b) => (b.count as number) - (a.count as number))
          .slice(0, 5);
        
        setAnalytics({
          totalRequests,
          trendingTopics: ['healing', 'family', 'missions'],
          recentActivity,
          topCategories
        });
        
      } catch (error) {
        console.error('Error loading prayer data:', error);
        // Fallback data
        setRequests([
          {
            id: '1',
            title: 'Prayer for Healing',
            description: 'Please pray for Sarah who is recovering from surgery.',
            category: 'health',
            urgency: 'high',
            date: new Date().toISOString(),
            anonymous: false,
            prayerCount: 12
          },
          {
            id: '2',
            title: 'Mission Team Safety',
            description: 'Praying for our mission team serving in Guatemala.',
            category: 'missions',
            urgency: 'medium',
            date: new Date(Date.now() - 86400000).toISOString(),
            anonymous: false,
            prayerCount: 8
          }
        ]);
        setAnalytics({
          totalRequests: 45,
          trendingTopics: ['healing', 'family', 'missions'],
          recentActivity: 12,
          topCategories: [
            { category: 'health', count: 15 },
            { category: 'family', count: 12 },
            { category: 'missions', count: 8 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      'health': 'bg-blue-200 text-blue-900 border-blue-300',
      'family': 'bg-purple-200 text-purple-900 border-purple-300',
      'missions': 'bg-yellow-200 text-yellow-900 border-yellow-300',
      'church': 'bg-green-200 text-green-900 border-green-300',
      'community': 'bg-pink-200 text-pink-900 border-pink-300',
      'general': 'bg-gray-200 text-gray-900 border-gray-300'
    };
    return colors[category as keyof typeof colors] || colors.general;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create new prayer request with unique ID
      const newRequest: PrayerRequest = {
        id: `prayer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        urgency: formData.urgency,
        anonymous: formData.anonymous,
        email: formData.email,
        date: new Date().toISOString(),
        prayerCount: 0
      };

      // Add to local requests
      setRequests(prevRequests => [newRequest, ...prevRequests]);

      // Save to localStorage
      const existingRequests = JSON.parse(localStorage.getItem('localPrayerRequests') || '[]');
      const updatedRequests = [newRequest, ...existingRequests];
      localStorage.setItem('localPrayerRequests', JSON.stringify(updatedRequests));

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'general',
        urgency: 'medium',
        anonymous: false,
        email: ''
      });
      setShowForm(false);
      
      // Show success message
      alert('Prayer request submitted successfully!');
    } catch (error) {
      console.error('Error submitting prayer request:', error);
      alert('Error submitting prayer request. Please try again.');
    }
  };

  const handlePrayingClick = async (requestId: string) => {
    // Check if user has already prayed for this request
    if (prayedRequests.has(requestId)) {
      return; // Already prayed, do nothing
    }

    try {
      // Update local state immediately for better UX
      setRequests(prevRequests => 
        prevRequests.map(req => 
          req.id === requestId 
            ? { ...req, prayerCount: req.prayerCount + 1 }
            : req
        )
      );

      // Add to prayed requests set
      const newPrayedRequests = new Set(prayedRequests);
      newPrayedRequests.add(requestId);
      setPrayedRequests(newPrayedRequests);

      // Save to localStorage for immediate feedback
      localStorage.setItem('prayedRequests', JSON.stringify([...newPrayedRequests]));

      // Update prayer count in localStorage
      const existingRequests = JSON.parse(localStorage.getItem('localPrayerRequests') || '[]');
      const updatedRequests = existingRequests.map((req: PrayerRequest) => 
        req.id === requestId 
          ? { ...req, prayerCount: req.prayerCount + 1 }
          : req
      );
      localStorage.setItem('localPrayerRequests', JSON.stringify(updatedRequests));

      // Update analytics
      setAnalytics(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          totalRequests: prev.totalRequests,
          recentActivity: prev.recentActivity + 1
        };
      });

    } catch (error) {
      console.error('Error updating prayer count:', error);
      // Revert on error
      setRequests(prevRequests => 
        prevRequests.map(req => 
          req.id === requestId 
            ? { ...req, prayerCount: req.prayerCount - 1 }
            : req
        )
      );
      
      // Remove from prayed requests
      const revertedPrayedRequests = new Set(prayedRequests);
      revertedPrayedRequests.delete(requestId);
      setPrayedRequests(revertedPrayedRequests);
      localStorage.setItem('prayedRequests', JSON.stringify([...revertedPrayedRequests]));
    }
  };

  const filteredRequests = requests.filter(request => 
    selectedCategory === 'all' || request.category === selectedCategory
  );

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
    <section className="bg-white rounded-lg shadow-md p-6">
      {/* Header with Analytics */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-gold-600" />
          <h3 className="text-lg font-semibold text-gray-900">Prayer Requests</h3>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-sm text-gray-600">{analytics?.totalRequests || 0} total</span>
        </div>
      </div>

      {/* Analytics Bar */}
      {analytics && (
        <div className="mb-6 p-4 bg-gradient-to-r from-gold-50 to-gold-100 rounded-lg border border-gold-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gold-800">Recent Activity</h4>
            <span className="text-sm text-gold-600">{analytics.recentActivity} new requests</span>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-gold-700">
              <strong>Trending:</strong> {analytics.trendingTopics.join(', ')}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {analytics.topCategories.slice(0, 3).map((cat, index) => (
                <span key={index} className="px-2 py-1 bg-gold-200 text-gold-800 rounded-full text-xs">
                  {cat.category} ({cat.count})
                </span>
              ))}
            </div>
            
            {/* Prayer History */}
            <div className="mt-3 pt-3 border-t border-gold-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gold-700">
                  Your prayers: <strong>{prayedRequests.size}</strong>
                </span>
                {prayedRequests.size > 0 && (
                  <button 
                    onClick={() => {
                      if (confirm('Clear your prayer history? This will allow you to pray for requests again.')) {
                        setPrayedRequests(new Set());
                        localStorage.removeItem('prayedRequests');
                      }
                    }}
                    className="text-xs text-gold-600 hover:text-gold-800 underline"
                  >
                    Reset History
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="mb-4 flex items-center space-x-2">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-2 py-1 text-gray-900 bg-white"
        >
          <option value="all">All Categories</option>
          <option value="health">Health</option>
          <option value="family">Family</option>
          <option value="missions">Missions</option>
          <option value="church">Church</option>
          <option value="community">Community</option>
          <option value="general">General</option>
        </select>
      </div>

      {/* Prayer Requests */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No prayer requests available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.slice(0, 5).map((request) => (
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
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handlePrayingClick(request.id)}
                    disabled={prayedRequests.has(request.id)}
                    className={`text-xs font-medium flex items-center space-x-1 transition-colors ${
                      prayedRequests.has(request.id)
                        ? 'text-green-600 cursor-not-allowed opacity-75'
                        : 'hover:underline hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${prayedRequests.has(request.id) ? 'fill-current' : ''}`} />
                    <span>
                      {prayedRequests.has(request.id) ? 'Praying' : 'I\'m Praying'} ({request.prayerCount})
                    </span>
                  </button>
                  <button className="text-xs font-medium hover:underline">
                    Share
                  </button>
                </div>
                {request.anonymous && (
                  <span className="text-xs text-gray-500">Anonymous</span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Submit Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Submit Prayer Request</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 text-gray-900"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
                  >
                    <option value="general">General</option>
                    <option value="health">Health</option>
                    <option value="family">Family</option>
                    <option value="missions">Missions</option>
                    <option value="church">Church</option>
                    <option value="community">Community</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({...formData, urgency: e.target.value as 'high' | 'medium' | 'low'})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.anonymous}
                    onChange={(e) => setFormData({...formData, anonymous: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Submit anonymously</span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
                  required
                />
              </div>
              

              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-6 p-4 bg-gold-50 rounded-lg border border-gold-200">
        <div className="text-center">
          <Heart className="w-8 h-8 mx-auto text-gold-600 mb-2" />
          <p className="text-sm text-gold-800 font-medium mb-2">
            Submit a Prayer Request
          </p>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-gold-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gold-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Share Your Request</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SmartPrayerRequests; 