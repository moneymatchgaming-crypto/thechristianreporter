# The Christian Reporter 🕊️

Real-time Christian news aggregation with faith-based content, ministry updates, prayer requests, and church events.

## ✨ Features

- **📰 Real-time News**: Aggregated from 10+ trusted Christian news sources
- **⚡ Smart Caching**: 5-minute news cache, 1-hour ministry data cache
- **📖 Daily Bible Verse**: Rotating daily Bible verses with multiple translations
- **🙏 Prayer Requests**: Community prayer request sharing and support
- **🏛️ Church Events**: Local and global church event listings
- **❤️ Ministry Updates**: Latest updates from major Christian ministries
- **🔄 Auto-refresh**: News updates every 5 minutes
- **📱 Responsive**: Mobile-first design with Tailwind CSS
- **🚀 Fast Loading**: Optimized with caching and parallel processing
- **🛡️ Fallback System**: Graceful degradation when APIs are unavailable

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + RSS aggregation
- **Caching**: In-memory caching with background refresh
- **APIs**: RSS feeds from major Christian news sources

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/christian-reporter.git
cd christian-reporter
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env
# Edit .env with your configuration
```

4. **Start development servers**
```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Health Check: http://localhost:3001/health

## 🌐 Production Deployment

### Quick Deployment to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy to Vercel**
```bash
vercel --prod
```

3. **Set Environment Variables in Vercel Dashboard**
```env
YOUTUBE_API_KEY=your_youtube_api_key
ESV_API_KEY=your_esv_api_key (optional)
CORS_ORIGIN=https://your-domain.com
```

### Manual Deployment Steps

1. **Build the project**
```bash
npm run build
```

2. **Test production build**
```bash
npm run preview
```

3. **Deploy to Vercel**
```bash
vercel --prod
```

### Environment Variables Required

```env
# Required
YOUTUBE_API_KEY=your_youtube_api_key_here

# Optional
ESV_API_KEY=your_esv_api_key_here
CORS_ORIGIN=https://your-domain.com
PORT=3001
```

### Domain Configuration

1. **Purchase domain**: thechristianreporter.com
2. **Configure DNS**:
   - Frontend: `@` → Vercel/Netlify
   - Backend: `api` → Railway/Render
3. **Update environment variables**:
   - `VITE_API_BASE_URL=https://api.thechristianreporter.com`
   - `CORS_ORIGIN=https://thechristianreporter.com`

## 📊 API Endpoints

### News & Content
- `GET /api/news` - Get cached news articles
- `GET /api/cache-status` - Check cache status
- `POST /api/refresh-cache` - Manually refresh cache

### Ministry & Community
- `GET /api/ministry-updates` - Get ministry updates
- `GET /api/prayer-requests` - Get prayer requests
- `GET /api/church-events` - Get church events
- `GET /api/daily-verse` - Get daily Bible verse

### Health & Monitoring
- `GET /health` - Health check endpoint

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:3001` |
| `PORT` | Backend port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `CORS_ORIGIN` | Allowed origins | `http://localhost:3000` |

### RSS Feed Configuration

The application aggregates news from 10+ Christian RSS feeds including:
- Christianity Today
- Christian Post
- Charisma News
- CBN News
- Gospel Coalition
- Desiring God
- Crosswalk
- Bible Gateway
- Relevant Magazine

Feeds are automatically cached and refreshed in the background. Failed feeds are gracefully handled with fallback mechanisms.

## 📈 Performance Features

- **Parallel Processing**: 10 concurrent RSS feed requests
- **Timeout Protection**: 5-second timeout per feed
- **Smart Caching**: 5-minute news cache, 1-hour ministry data cache
- **Background Refresh**: Non-blocking cache updates
- **Error Handling**: Graceful degradation on API failures

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start frontend dev server
npm run server       # Start backend server
npm run server:dev   # Start backend with nodemon
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run deploy:check # Pre-deployment checks
```

### Project Structure

```
christian-reporter/
├── src/
│   ├── components/     # React components
│   │   ├── Header.tsx
│   │   ├── NewsCard.tsx
│   │   ├── NewsGrid.tsx
│   │   ├── TopNewsCarousel.tsx
│   │   ├── DailyVerse.tsx
│   │   ├── MinistryUpdates.tsx
│   │   ├── PrayerRequests.tsx
│   │   ├── ChurchEvents.tsx
│   │   └── Footer.tsx
│   ├── services/       # API services
│   │   └── api.ts
│   ├── types.ts        # TypeScript types
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # React entry point
│   └── index.css       # Global styles
├── server.cjs          # Backend server
├── env.example         # Environment template
└── README.md          # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones (#0ea5e9) - Trust and reliability
- **Faith**: Orange tones (#f2751a) - Warmth and spirituality
- **Gold**: Gold tones (#f59e0b) - Divine and precious

### Typography
- **Serif**: Georgia for headings and Bible verses
- **Sans**: Inter for body text and UI elements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/christian-reporter/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/christian-reporter/wiki)

## 🚀 Roadmap

- [ ] User accounts and preferences
- [ ] Push notifications for prayer requests
- [ ] Advanced filtering and search
- [ ] Bible study tools integration
- [ ] Social features and sharing
- [ ] Mobile app development
- [ ] Podcast integration
- [ ] Live streaming events

## 🙏 Prayer Requests

This project was built with prayer and for the Christian community. We believe in the power of technology to bring people together in faith and fellowship.

---

Built with ❤️ for the Christian community by The Christian Reporter team 