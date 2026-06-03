import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Lead Generator</h3>
            <p className="text-gray-400 text-sm">
              Powerful Google Maps B2B contact enrichment engine. Extract business leads with real-time data processing.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Real-time Lead Extraction</li>
              <li>Email Enrichment</li>
              <li>Multi-location Support</li>
              <li>Export Capabilities</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>info.aetarix@google.com</li>
              <li>+92 3024387800</li>
              <li>+92 3260590466</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Lead Generator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
