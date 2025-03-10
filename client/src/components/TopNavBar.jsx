// client/src/components/TopNavBar.jsx

import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const TopNavBar = ({ userName }) => {
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      {/* Left Side */}
      <div className="flex items-center">
        <h1 className="text-white text-2xl font-bold">Dashboard Chrysostomos Try</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        <span className="text-white">Welcome Back, {userName} 👋</span>
        <button className="relative">
          <FaBell className="h-6 w-6 text-white" />
          {/* Notification Badge */}
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            3
          </span>
        </button>
        <button>
          <FaUserCircle className="h-8 w-8 text-white" />
        </button>
      </div>
    </nav>
  );
};

export default TopNavBar;
