import React from 'react';
import { Heart, Shield, ExternalLink, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Main Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-bold">The Christian Reporter</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted source for faith-based news, Christian content, and spiritual resources. 
              Connecting believers with meaningful content that uplifts and inspires.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Safe & Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Faith-Based</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#news" className="text-gray-300 hover:text-white transition-colors">
                  Latest News
                </a>
              </li>
              <li>
                <a href="#prayer" className="text-gray-300 hover:text-white transition-colors">
                  Prayer Requests
                </a>
              </li>
              <li>
                <a href="#social" className="text-gray-300 hover:text-white transition-colors">
                  Christian Content
                </a>
              </li>
              <li>
                <a href="#events" className="text-gray-300 hover:text-white transition-colors">
                  Church Events
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="font-semibold mb-4">Contact & Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="text-gray-300 hover:text-white transition-colors">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="mailto:contact@christianreporter.com" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                  <Mail className="w-3 h-3" />
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Content Disclaimer */}
            <div>
              <h5 className="font-semibold mb-2 text-sm">Content Disclaimer</h5>
              <p className="text-xs text-gray-400 leading-relaxed">
                The Christian Reporter aggregates content from various Christian news sources and social media platforms. 
                We do not endorse all views expressed in external content. External links are provided for informational 
                purposes only and do not constitute endorsement.
              </p>
            </div>

            {/* Prayer Disclaimer */}
            <div>
              <h5 className="font-semibold mb-2 text-sm">Prayer Request Disclaimer</h5>
              <p className="text-xs text-gray-400 leading-relaxed">
                Prayer requests are submitted by users and may contain sensitive information. 
                We encourage discretion and respect for privacy. All prayer requests are moderated 
                for appropriate content before publication.
              </p>
            </div>
          </div>
        </div>

        {/* External Content Disclaimer */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h5 className="font-semibold mb-2 text-sm flex items-center space-x-2">
              <ExternalLink className="w-4 h-4" />
              <span>External Content Notice</span>
            </h5>
            <p className="text-xs text-gray-400 leading-relaxed">
              This site may display content from YouTube and other external platforms. 
              External content is subject to the terms and policies of those platforms. 
              We do not control external content and are not responsible for third-party 
              advertisements or content that may appear.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} The Christian Reporter. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Made with ❤️ for the Christian community</span>
              <span>•</span>
              <span>Version 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 