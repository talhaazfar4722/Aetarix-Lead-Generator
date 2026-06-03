import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import logo from '../assets/aetarixcopy.svg'; 
import Navbar from '../components/Navbar';

const socket = io('http://localhost:5000');

export default function LeadPage() {
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [specificArea, setSpecificArea] = useState('');
  const [leads, setLeads] = useState([]);
  const [isScraping, setIsScraping] = useState(false);
  const [currentSearch, setCurrentSearch] = useState({ keyword: '', country: '', city: '', area: '' });

  useEffect(() => {
    // Load persisted leads from backend on first render
    axios.get('http://localhost:5000/api/leads')
      .then(res => {
        if (Array.isArray(res.data)) setLeads(res.data.reverse());
      })
      .catch(() => {});
    // Listen for realtime data streams from the backend scraper
    socket.on('live-lead', (newLead) => {
      setLeads((prevLeads) => {
        const existingIndex = prevLeads.findIndex((lead) => (lead.name === newLead.name && lead.phone === newLead.phone));

        if (existingIndex !== -1) {
          const updatedLeads = [...prevLeads];
          updatedLeads[existingIndex] = { ...updatedLeads[existingIndex], ...newLead };
          return updatedLeads;
        }

        return [...prevLeads, newLead];
      });
    });

    // Listen for completion switch from Node backend to release button locks
    socket.on('scraping-finished', () => {
      setIsScraping(false);
    });

    return () => {
      socket.off('live-lead');
      socket.off('scraping-finished');
    };
  }, []);

  const handleStartScraping = async (e) => {
    e.preventDefault();
    if (!keyword || !country || !city) return alert('Please fill out Keyword, Country, and City fields');

    try {
      setIsScraping(true);
      setCurrentSearch({ keyword, country, city, area: specificArea });
      await axios.post('http://localhost:5000/api/scrape', { keyword, country, city, specificArea });
    } catch (error) {
      console.error('API Error:', error);
      setIsScraping(false);
    }
  };

  return (
    <div className=" min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      {/* Control Panel Form Layout */}
      <form onSubmit={handleStartScraping} className="container mx-auto pt-20 flex flex-col lg:flex-row gap-4 mb-8 items-center  p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="w-full lg:w-auto">
          <input 
            type="text" 
            placeholder="Keyword (e.g. Gym, Cafe)" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            className="w-full lg:w-48 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 text-sm transition"
            disabled={isScraping}
          />
        </div>
        
        <div className="w-full lg:w-auto">
          <input 
            type="text" 
            placeholder="Country (e.g. Pakistan)" 
            value={country} 
            onChange={(e) => setCountry(e.target.value)} 
            className="w-full lg:w-48 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 text-sm transition"
            disabled={isScraping}
          />
        </div>

        <div className="w-full lg:w-auto">
          <input 
            type="text" 
            placeholder="City (e.g. Lahore)" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            className="w-full lg:w-48 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 text-sm transition"
            disabled={isScraping}
          />
        </div>
        
        <div className="w-full lg:w-auto">
          <input 
            type="text" 
            placeholder="Specific Area (Optional)" 
            value={specificArea} 
            onChange={(e) => setSpecificArea(e.target.value)} 
            className="w-full lg:w-48 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 text-sm transition"
            disabled={isScraping}
          />
        </div>
        
        <button 
          type="submit" 
          className={`w-full lg:w-auto ml-auto px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all duration-150 ${
            isScraping 
              ? 'bg-gray-400 text-white cursor-not-allowed animate-pulse' 
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
          }`}
          disabled={isScraping}
        >
          {isScraping ? 'Extraction Engine Running...' : 'Extract Realtime Leads'}
        </button>
      </form>

      {/* Data Visualizer Grid Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden container mx-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="bg-gray-900 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-4 font-semibold w-12">#</th>
              <th className="px-6 py-4 font-semibold border">Business Name</th>
              <th className="px-6 py-4 font-semibold border">Phone Number</th>
              <th className="px-6 py-4 font-semibold border">Website Domain</th>
              <th className="px-6 py-4 font-semibold border">Enriched Email Contacts</th>
              <th className="px-6 py-4 font-semibold border">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400 bg-gray-50/50">
                  No active extraction pipeline running. Enter inputs above to begin.
                </td>
              </tr>
            ) : (
              leads.map((lead, index) => (
                <tr key={index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="px-4 py-4 font-semibold text-gray-900 text-center border">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 border">{lead.name}</td>
                  <td className="px-6 py-4 font-mono text-gray-500 border">{lead.phone}</td>
                  <td className="px-6 py-4 border">
                    {lead.website !== 'N/A' ? (
                      <a href={lead.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium break-all">{lead.website}</a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 border">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      lead.email.includes('@') 
                        ? 'bg-green-100 text-green-800' 
                        : lead.email === 'Looking up...' 
                        ? 'bg-amber-100 text-amber-800 animate-pulse' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {lead.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 border text-xs">
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-900">{lead.keyword}</div>
                      <div className="text-gray-600">{lead.country}</div>
                      <div className="text-gray-600">{lead.city}</div>
                      <div className="text-gray-500 italic">{lead.specificArea}</div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
