import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Transform Google Maps into
              <span className="text-blue-600 block mt-2">Your Lead Machine</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Extract high-quality B2B leads from Google Maps with real-time contact enrichment. 
              Get phone numbers, websites, and verified email addresses instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/lead-generator" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-150 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Generating Leads
              </Link>
              <button className="bg-white text-gray-900 hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-150 shadow-md hover:shadow-lg border border-gray-200">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-600">Everything you need to scale your lead generation</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Extraction</h3>
                <p className="text-gray-600">Extract leads in real-time as they appear on Google Maps with instant data processing.</p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Email Enrichment</h3>
                <p className="text-gray-600">Automatically find and verify email addresses for every extracted business lead.</p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-location Support</h3>
                <p className="text-gray-600">Target specific countries, cities, and areas to find leads in your target markets.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-xl text-blue-100">Three simple steps to generate quality leads</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Enter Search Criteria</h3>
                <p className="text-blue-100">Specify your keyword, country, city, and optional area to target.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Start Extraction</h3>
                <p className="text-blue-100">Click the extract button and watch leads populate in real-time.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Export & Connect</h3>
                <p className="text-blue-100">Access enriched contact data and start reaching out to prospects.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Grow Your Business?</h2>
            <p className="text-xl text-gray-600 mb-10">
              Start generating high-quality leads today and watch your sales pipeline fill up.
            </p>
            <Link 
              to="/lead-generator" 
              className="inline-block bg-blue-600 text-white hover:bg-blue-700 px-10 py-4 rounded-xl text-lg font-bold transition-all duration-150 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
