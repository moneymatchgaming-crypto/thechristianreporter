#!/bin/bash

# Christian Reporter Deployment Script
echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Test the production build
echo "🧪 Testing production build..."
npm run preview &
PREVIEW_PID=$!

# Wait a moment for the server to start
sleep 5

# Check if the preview server is running
if curl -s http://localhost:4173 > /dev/null; then
    echo "✅ Production build test successful!"
    kill $PREVIEW_PID
else
    echo "❌ Production build test failed!"
    kill $PREVIEW_PID
    exit 1
fi

echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Deploy to Vercel: vercel --prod"
echo "3. Set environment variables in Vercel dashboard"
echo ""
echo "🔧 Environment variables needed:"
echo "- YOUTUBE_API_KEY"
echo "- ESV_API_KEY (optional)"
echo "- CORS_ORIGIN (your domain)" 