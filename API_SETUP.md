# API Setup Guide for Christian Social Media Integration

## YouTube Data API v3 Setup

### 1. Get YouTube API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "YouTube Data API v3"
4. Go to "Credentials" and create an API key
5. Copy the API key

### 2. Set Environment Variable
Create a `.env` file in the root directory:
```
YOUTUBE_API_KEY=your_youtube_api_key_here
```

### 3. Christian Channel IDs
The system will fetch content from these Christian channels:
- Desiring God
- Grace to You  
- Ligonier Ministries
- The Gospel Coalition
- Crossway

## TikTok Integration Options

### Option 1: TikTok Business API (Recommended)
1. Apply for TikTok Business API access
2. Get access token from TikTok
3. Set environment variable: `TIKTOK_ACCESS_TOKEN=your_token`

### Option 2: RapidAPI TikTok Service
1. Sign up at [RapidAPI TikTok Hub](https://rapidapi.com/hub/tiktok-api)
2. Get your API key
3. Set environment variable: `RAPIDAPI_KEY=your_key`

### Option 3: Web Scraping (Current Implementation)
The current implementation uses simulated TikTok content. For real data, implement one of the above options.

## Installation Steps

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set Environment Variables:**
   Create a `.env` file with your API keys

3. **Start the Server:**
   ```bash
   npm run server:dev
   ```

4. **Start the Frontend:**
   ```bash
   npm run dev
   ```

## API Features

### YouTube Integration
- ✅ Real video data from Christian channels
- ✅ View counts, likes, comments
- ✅ Video thumbnails and durations
- ✅ Channel information
- ✅ Automatic content filtering

### TikTok Integration
- 🔄 Simulated content (ready for real API)
- ✅ Christian hashtag filtering
- ✅ Engagement metrics
- ✅ User profiles and avatars

## Troubleshooting

### YouTube API Issues
- Check API key is valid
- Ensure YouTube Data API v3 is enabled
- Verify channel IDs are correct
- Check API quota limits

### TikTok API Issues
- Business API requires approval
- Consider RapidAPI as alternative
- Web scraping may be rate-limited

## Production Deployment

For production, consider:
1. **Caching**: Cache API responses to avoid rate limits
2. **Content Filtering**: Implement additional content moderation
3. **Error Handling**: Graceful fallbacks when APIs fail
4. **Monitoring**: Track API usage and errors
5. **Backup Data**: Maintain curated fallback content 