import React from 'react';
import { FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-8">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using The Christian Reporter website, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span>Permitted Uses</span>
              </h2>
              <p className="text-gray-700 mb-4">You may use our website for:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Reading and sharing Christian news and content</li>
                <li>Submitting prayer requests (with appropriate content)</li>
                <li>Viewing church events and ministry updates</li>
                <li>Accessing Christian social media content</li>
                <li>Personal, non-commercial use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
                <XCircle className="w-6 h-6 text-red-600" />
                <span>Prohibited Uses</span>
              </h2>
              <p className="text-gray-700 mb-4">You may not use our website to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Submit false or misleading information</li>
                <li>Harass, abuse, or harm others</li>
                <li>Submit inappropriate or offensive prayer requests</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools to access our services</li>
                <li>Distribute spam or unsolicited communications</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Prayer Request Guidelines</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> Prayer requests are moderated for appropriate content. We reserve the right to 
                  remove or edit requests that violate our guidelines.
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Be respectful and considerate of others</li>
                <li>Do not include personal information of others without consent</li>
                <li>Avoid requests that promote hate speech or discrimination</li>
                <li>Keep requests focused on spiritual and personal needs</li>
                <li>Do not use prayer requests for commercial purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The content on this website, including text, graphics, images, and software, is owned by The Christian 
                Reporter or its content suppliers and is protected by copyright laws.
              </p>
              <p className="text-gray-700">
                External content (such as YouTube videos) is subject to the terms and policies of those platforms. 
                We do not claim ownership of external content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">User Content</h2>
              <p className="text-gray-700 mb-4">
                By submitting prayer requests or other content, you grant us a non-exclusive, royalty-free license to 
                use, display, and distribute your content on our website.
              </p>
              <p className="text-gray-700">
                You retain ownership of your content and are responsible for ensuring you have the right to share it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <span>Disclaimers</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Content Accuracy</h3>
                  <p className="text-gray-700">
                    While we strive for accuracy, we do not guarantee the completeness, reliability, or accuracy of 
                    any information on our website. External content is not under our control.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Medical and Legal Advice</h3>
                  <p className="text-gray-700">
                    Content on this website is not intended as medical, legal, or professional advice. Always consult 
                    appropriate professionals for such matters.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Service Availability</h3>
                  <p className="text-gray-700">
                    We do not guarantee uninterrupted access to our website. We may modify, suspend, or discontinue 
                    services at any time.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-gray-700">
                The Christian Reporter shall not be liable for any indirect, incidental, special, consequential, or 
                punitive damages resulting from your use of our website or any content therein.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
              <p className="text-gray-700">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of 
                our website, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p className="text-gray-700">
                We may terminate or suspend your access to our website immediately, without prior notice, for any 
                reason, including breach of these Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                posting. Your continued use of the website constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <p className="text-gray-700">
                These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@christianreporter.com<br />
                  <strong>Address:</strong> [Your Business Address]<br />
                  <strong>Phone:</strong> [Your Phone Number]
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 