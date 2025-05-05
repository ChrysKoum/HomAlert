// client/src/components/TopNavBar.jsx

import React from 'react';
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa'; // Added FaSearch

const TopNavBar = ({ userName }) => {
  // Placeholder for notification count
  const notificationCount = 3; // Replace with actual data if available

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200">
      {/* Left Side: Welcome Message */}
      <div className="flex items-center">
        <span className="text-gray-700 text-lg font-medium">
          Welcome Back, {userName} 👋
        </span>
      </div>

      {/* Center: Optional Search Bar */}
      {/*
      <div className="relative flex-1 max-w-xs mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>
      */}

      {/* Right Side: Icons */}
      <div className="flex items-center space-x-6">
        {/* Notification Bell */}
        <button className="relative text-gray-600 hover:text-gray-800 focus:outline-none">
          <FaBell className="h-6 w-6" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {notificationCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <button className="focus:outline-none">
          {/* Replace with actual user image if available */}
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 overflow-hidden">
            {/* Placeholder with initials or default icon */}
            {/* <img src="/path/to/user-avatar.png" alt="User Avatar" className="h-full w-full object-cover" /> */}
            <FaUserCircle className="h-6 w-6" /> {/* Or show initials: <span className="text-sm font-medium">KU</span> */}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default TopNavBar;
