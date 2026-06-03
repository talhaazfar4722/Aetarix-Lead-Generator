import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/aetarixcopy.svg';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="Yaraa Logo" className="h-10" />
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/lead-generator" 
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-150 shadow-md hover:shadow-lg"
            >
              Generate Leads
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
