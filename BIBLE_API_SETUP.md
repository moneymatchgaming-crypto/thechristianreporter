# Bible API Setup Guide

The Christian Reporter includes a robust daily verse feature that uses multiple Bible APIs for reliability and quality.

## Available Bible APIs

### 1. Bible-API.com (Primary - Free)
- **URL**: https://bible-api.com/
- **Features**: Free, reliable, multiple translations
- **Usage**: No API key required
- **Translations**: KJV, WEB, ASV, and more
- **Status**: ✅ Working

### 2. ESV API (Premium - Optional)
- **URL**: https://api.esv.org/
- **Features**: High-quality ESV translation, excellent formatting
- **Usage**: Requires free API key
- **Translations**: ESV only
- **Setup**: 
  1. Visit https://api.esv.org/
  2. Sign up for a free account
  3. Get your API key
  4. Add to `.env` file: `ESV_API_KEY=your_key_here`

### 3. OpenBible.info (Fallback - Free)
- **URL**: https://labs.bible.org/api/
- **Features**: Free, random verses
- **Usage**: No API key required
- **Translations**: NIV
- **Status**: ⚠️ Sometimes returns 403 errors

## How It Works

The system tries APIs in this order:
1. **Bible-API.com** (primary)
2. **ESV API** (if key provided)
3. **OpenBible.info** (fallback)
4. **Local fallback verses** (if all APIs fail)

## Daily Verse Selection

The system selects verses based on the day of the year to ensure:
- Consistent verses for each day
- Variety across the year
- Popular, meaningful verses

## Testing

Run the test script to verify API functionality:
```bash
node test-bible-api.cjs
```

## Configuration

### Environment Variables
```env
# Optional ESV API key for premium translations
ESV_API_KEY=your_esv_api_key_here
```

### API Endpoints
- `GET /api/daily-verse` - Get today's verse
- `POST /api/refresh-verse` - Manually refresh the verse

## Popular Verses Included

The system includes 20 popular verses that rotate daily:
- John 3:16
- Philippians 4:13
- Jeremiah 29:11
- Romans 8:28
- Psalm 23:1
- Matthew 28:19-20
- Galatians 5:22-23
- Proverbs 3:5-6
- Isaiah 40:31
- Psalm 46:10
- Colossians 3:23
- Ephesians 2:8-9
- 2 Timothy 1:7
- James 1:5
- 1 Corinthians 13:4-7
- Psalm 119:105
- Matthew 11:28-30
- John 14:6
- Acts 1:8
- Revelation 3:20

## Troubleshooting

### If APIs are failing:
1. Check internet connection
2. Verify API endpoints are accessible
3. Check for rate limiting
4. Review server logs for specific error messages

### If you want to add more verses:
Edit the `popularVerses` array in `server.cjs` around line 320.

### If you want to use a different translation:
The Bible-API.com supports multiple translations. You can modify the API call to specify a different translation. 