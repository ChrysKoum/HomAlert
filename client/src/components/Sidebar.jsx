import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FaThLarge,
  FaUtensils,
  FaBath,
  FaCouch,
  FaBolt,
  FaCog,
  FaExclamationTriangle,
  FaBell,
  FaInfoCircle,
  FaSignOutAlt,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';
import logoImage from '../assets/logo/logo_trasperant_without_text.png';

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const topMenuItems = [
    { name: 'Dashboard', icon: FaThLarge, route: '/dashboard' },
    { name: 'Kitchen', icon: FaUtensils, route: '/dashboard/kitchen' },
    { name: 'Bathroom', icon: FaBath, route: '/dashboard/bathroom' },
    { name: 'Living Room', icon: FaCouch, route: '/dashboard/living' },
    { name: 'Utilities', icon: FaBolt, route: '/dashboard/utilities' },
  ];
  
  const bottomMenuItems = [
    { name: 'Settings', icon: FaCog, route: '/dashboard/settings' },
    { name: 'Alerts', icon: FaExclamationTriangle, route: '/dashboard/alerts' },
    { name: 'Notifications', icon: FaBell, route: '/dashboard/notifications' },
    // { name: 'Night Mode', icon: FaMoon, route: '/dashboard/night-mode' }, // Removed Night Mode
    { name: 'Information', icon: FaInfoCircle, route: '/dashboard/information' },
    { name: 'Logout', icon: FaSignOutAlt, route: '/auth/logout' },
  ];

  const linkClasses = `
    flex items-center w-full py-3 px-4 rounded-lg
    text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700
    transition-colors duration-200
  `;

  const activeLinkClasses = 'bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300 font-medium';

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={
        `bg-white dark:bg-gray-800 h-screen flex flex-col shadow-md fixed top-0 left-0 z-10 overflow-y-auto overflow-x-hidden \
        transition-all duration-700 ease-out \
        ${isExpanded ? 'w-64' : 'w-20'}`
      }
    >
      <Link
        to="/dashboard"
        className="flex items-center h-20 border-b border-gray-100 dark:border-gray-700 focus:outline-none px-4"
      >
        <div
          className={`flex items-center h-16 w-full ${isExpanded ? 'justify-start' : 'justify-center'}`}
        >
          <img src={logoImage} alt="Logo" className="h-10 w-10 object-contain flex-shrink-0" />
          <span
            className={`text-xl font-semibold text-gray-700 dark:text-gray-200 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
              isExpanded
                ? 'opacity-100 ml-2 max-w-[150px] delay-300'
                : 'opacity-0 ml-0 max-w-0'
            }`}
          >
            HomAlert
          </span>
        </div>
      </Link>

      {/* Top Menu Items */}
      <nav className="flex-grow px-3 py-4 space-y-2">
        {topMenuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.route}
            end={item.route === '/dashboard'}
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ''}`
            }
            title={item.name}
          >
            <item.icon className="h-6 w-6 flex-shrink-0" />
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-out ${
              isExpanded
                ? 'opacity-100 ml-3 max-w-[150px] delay-700'
                : 'opacity-0 ml-0 max-w-0'
            }`}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Menu Items */}
      <nav className="px-3 py-4 space-y-2"> 
        {bottomMenuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.route}
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ''}`
            }
            title={item.name}
          >
            <item.icon className={`h-6 w-6 flex-shrink-0 ${item.name === 'Logout' ? 'text-yellow-500' : ''}`} />
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-out ${
              isExpanded
                ? 'opacity-100 ml-3 max-w-[150px] delay-700'
                : 'opacity-0 ml-0 max-w-0'
            }`}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Toggle Button */}
      <div className="mt-auto border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={toggleSidebar}
          className={`flex items-center w-full py-3 px-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none ${isExpanded ? 'justify-start' : 'justify-center'}`}
          title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isExpanded ? <FaAngleDoubleLeft className="h-6 w-6 flex-shrink-0" /> : <FaAngleDoubleRight className="h-6 w-6 flex-shrink-0" />}
          <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-out ${
            isExpanded
              ? 'opacity-100 ml-3 max-w-[150px] delay-700' 
              : 'opacity-0 ml-0 max-w-0'
          }`}>
            {isExpanded ? "Collapse" : ""}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;