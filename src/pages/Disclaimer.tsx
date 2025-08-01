import React from 'react';
import { AlertTriangle, Info, Shield, ExternalLink } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-8">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
            <h1 className="text-3xl font-bold text-gray-900">Disclaimer</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                  <p className="text-yellow-700 text-sm">
                    Please read this disclaimer carefully before using The Christian Reporter website. 
                    By using our services, you acknowledge that you have read and understood this disclaimer.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <span>Content Disclaimer</span>
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  The Christian Reporter aggregates and displays content from various Christian news sources, 
                  social media platforms, and other external sources. We do not create, control, or endorse 
                  all the content displayed on our website.
                </p>
                <p className="text-gray-700">
                  While we strive to provide accurate and reliable information, we cannot guarantee the 
                  completeness, accuracy, or timeliness of any content on our website. Information may be 
                  outdated, incomplete, or contain errors.
                </p>
                <p className="text-gray-700">
                  External content is subject to the terms and policies of those platforms. We do not 
                  claim ownership of external content and are not responsible for third-party content.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
                <ExternalLink className="w-6 h-6 text-green-600" />
                <span>External Links and Content</span>
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Our website may contain links to external websites and display content from third-party 
                  platforms such as YouTube. We do not control these external sources and are not responsible 
                  for their content, privacy practices, or availability.
                </p>
                <p className="text-gray-700">
                  External content may include advertisements, sponsored content, or other material that 
                  we do not endorse. Users should exercise their own judgment when accessing external content.
                </p>
                <p className="text-gray-700">
                  We do not guarantee that external links will remain active or that external content will 
                  remain available. External content is subject to change without notice.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Prayer Request Disclaimer</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800 text-sm">
                  <strong>Important:</strong> Prayer requests are submitted by users and may contain sensitive 
                  personal information. We encourage discretion and respect for privacy.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Prayer requests displayed on our website are submitted by users and may contain personal 
                  information. While we moderate content for appropriateness, we cannot guarantee the accuracy 
                  or completeness of prayer request information.
                </p>
                <p className="text-gray-700">
                  We are not responsible for the content of prayer requests or any consequences that may 
                  arise from their publication. Users should exercise discretion when sharing personal information.
                </p>
                <p className="text-gray-700">
                  Prayer requests are not intended as a substitute for professional medical, legal, or 
                  spiritual advice. Users should consult appropriate professionals for serious matters.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">No Professional Advice</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Content on this website is provided for informational and educational purposes only. 
                  It is not intended as professional advice of any kind, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Medical advice or health recommendations</li>
                  <li>Legal advice or legal interpretations</li>
                  <li>Financial advice or investment recommendations</li>
                  <li>Spiritual counseling or pastoral care</li>
                  <li>Professional psychological or therapeutic advice</li>
                </ul>
                <p className="text-gray-700">
                  Always consult qualified professionals for matters requiring expert advice. Do not rely 
                  solely on information from this website for important decisions.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We strive to maintain high availability of our website, but we do not guarantee uninterrupted 
                  access. Our website may be temporarily unavailable due to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Scheduled maintenance and updates</li>
                  <li>Technical issues or server problems</li>
                  <li>External service dependencies</li>
                  <li>Force majeure events</li>
                </ul>
                <p className="text-gray-700">
                  We reserve the right to modify, suspend, or discontinue any part of our service at any 
                  time without prior notice.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  To the maximum extent permitted by law, The Christian Reporter shall not be liable for any 
                  damages arising from your use of our website, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Direct, indirect, incidental, or consequential damages</li>
                  <li>Loss of data, profits, or business opportunities</li>
                  <li>Personal injury or property damage</li>
                  <li>Emotional distress or mental anguish</li>
                  <li>Any other damages resulting from website use</li>
                </ul>
                <p className="text-gray-700">
                  This limitation applies regardless of the form of action, whether in contract, tort, or otherwise.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Indemnification</h2>
              <p className="text-gray-700">
                By using our website, you agree to indemnify and hold harmless The Christian Reporter, its 
                officers, directors, employees, and agents from any claims, damages, or expenses arising from 
                your use of our services or violation of our terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to Disclaimer</h2>
              <p className="text-gray-700">
                We may update this disclaimer from time to time. Changes will be effective immediately upon 
                posting. Your continued use of our website constitutes acceptance of any modified disclaimer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-700">
                If you have questions about this disclaimer or need clarification on any points, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@christianreporter.com<br />
                  <strong>Address:</strong> [Your Business Address]<br />
                  <strong>Phone:</strong> [Your Phone Number]
                </p>
              </div>
            </section>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-8">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> This disclaimer is part of our Terms of Service. By using our website, 
                you acknowledge that you have read and understood both this disclaimer and our Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer; 