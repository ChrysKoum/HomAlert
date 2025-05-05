import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  FaThLarge,
  FaUtensils, // Kitchen
  FaBath,     // Bathroom
  FaCouch,    // Living Room
  FaBolt,     // Utilities (example icon)
  FaCog,
  FaExclamationTriangle, // Alerts
  FaBell,     // Notifications
  FaMoon,
  FaInfoCircle, // Information
  FaSignOutAlt,
} from 'react-icons/fa';
import logoImage from '../assets/logo/logo_trasperant_without_text.png';

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const location = useLocation();

  // Updated top menu items for rooms
  const topMenuItems = [
    { name: 'Dashboard', icon: FaThLarge, route: '/dashboard' },
    { name: 'Kitchen', icon: FaUtensils, route: '/dashboard/kitchen' },
    { name: 'Bathroom', icon: FaBath, route: '/dashboard/bathroom' },
    { name: 'Living Room', icon: FaCouch, route: '/dashboard/living' },
    { name: 'Utilities', icon: FaBolt, route: '/dashboard/utilities' }, // Added Utilities here
  ];

  // Updated bottom menu items
  const bottomMenuItems = [
    { name: 'Settings', icon: FaCog, route: '/dashboard/settings' },
    { name: 'Alerts', icon: FaExclamationTriangle, route: '/dashboard/alerts' }, // Active Alerts
    { name: 'Notifications', icon: FaBell, route: '/dashboard/notifications' }, // General Notifications
    { name: 'Night Mode', icon: FaMoon, route: '/dashboard/night-mode' },
    { name: 'Information', icon: FaInfoCircle, route: '/dashboard/information' }, // Info Page
    { name: 'Logout', icon: FaSignOutAlt, route: '/auth/logout' },
  ];

  const linkClasses = `
    flex items-center w-full py-3 px-4 rounded-lg
    text-gray-600 hover:text-blue-600 hover:bg-blue-50
    transition-colors duration-200
  `;

  const activeLinkClasses = 'bg-blue-100 text-blue-700 font-medium';

  return (
    <aside
      className={`bg-white h-screen flex flex-col shadow-md transition-all duration-300 ease-in-out fixed top-0 left-0 z-10 overflow-y-auto ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Link
        to="/dashboard"
        className="flex items-center justify-center h-20 border-b border-gray-100 focus:outline-none "
      >
        <div
          className={`flex items-center justify-center h-16 w-16 rounded-lg bg-white text-white text-xl font-bold overflow-hidden transition-all duration-300`}
        >
          <img src={logoImage} alt="Logo" className="h-10 w-10 object-contain" />
        </div>
      </Link>

      {/* Top Menu Items */}
      <nav className="flex-grow px-3 py-4 space-y-2">
        {topMenuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.route}
            // Add the 'end' prop only for the main dashboard route
            end={item.route === '/dashboard'}
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ''}`
            }
            title={item.name}
          >
            <item.icon className={`h-6 w-6 flex-shrink-0 ${isExpanded ? 'mr-3' : 'mx-auto'}`} />
            <span className={`transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Menu Items */}
      <nav className="px-3 py-4 space-y-2 border-t border-gray-100">
        {bottomMenuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.route}
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ''}`
            }
            title={item.name}
          >
            <item.icon className={`h-6 w-6 flex-shrink-0 ${isExpanded ? 'mr-3' : 'mx-auto'}`} />
            <span className={`transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;