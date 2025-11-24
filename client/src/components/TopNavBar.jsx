import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaUserCircle, FaSun, FaMoon, FaCog, FaSignOutAlt, FaUser, FaBars } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

const TopNavBar = ({ isDarkMode, setIsDarkMode, toggleSidebar }) => {
  const { user } = useUser();
  const [notificationCount, setNotificationCount] = useState(3);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get user's display name from context or calculate it
  const displayName = user?.displayName || (user?.email ? user.email.split('@')[0] : 'User');

  return (
    <nav className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
      {/* Left Side: Hamburger & Welcome Message */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 focus:outline-none"
        >
          <FaBars className="h-6 w-6" />
        </button>
        <span className="text-gray-700 dark:text-gray-200 text-lg font-medium truncate max-w-[200px] sm:max-w-none">
          Welcome Back, <span className="hidden sm:inline">{displayName}</span><span className="sm:hidden">{displayName.split(' ')[0]}</span> 👋
        </span>
      </div>

      {/* Right Side: Icons */}
      <div className="flex items-center space-x-4 md:space-x-6">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
          aria-label={isDarkMode ? 'Activate light mode' : 'Activate dark mode'}
        >
          <FaSun
            className={`h-5 w-5 transition-all duration-300 ease-in-out ${
              isDarkMode ? 'opacity-0 transform scale-50 rotate-90' : 'opacity-100 transform scale-100 rotate-0'
            }`}
          />
          <FaMoon
            className={`h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${
              isDarkMode ? 'opacity-100 transform scale-100 rotate-0' : 'opacity-0 transform scale-50 -rotate-90'
            }`}
          />
        </button>

        {/* Notification Bell */}
        <button className="relative text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 focus:outline-none">
          <FaBell className="h-6 w-6" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {notificationCount}
            </span>
          )}
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={toggleProfileDropdown}
            className="focus:outline-none flex items-center"
          >
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <FaUserCircle className="h-6 w-6" />
              )}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">
              {displayName}
            </span>
          </button>

          {/* Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm leading-5 font-medium text-gray-900 dark:text-white truncate">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || ''}
                </p>
              </div>              <Link 
                to="/dashboard/settings" 
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <FaUser className="mr-2 h-4 w-4" />
                Your Profile
              </Link>

              <Link 
                to="/dashboard/settings" 
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <FaCog className="mr-2 h-4 w-4" />
                Settings
              </Link>

              <div className="border-t border-gray-200 dark:border-gray-700"></div>

              <Link 
                to="/auth/logout" 
                className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <FaSignOutAlt className="mr-2 h-4 w-4" />
                Sign out
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;