import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaRegChartBar,
  FaBolt,
  FaCog,
  FaBell,
  FaMoon,
  FaSignOutAlt,
} from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { name: 'Home', icon: FaHome, route: '/dashboard' },
    { name: 'Sensors', icon: FaRegChartBar, route: '/dashboard/sensors' },
    { name: 'Utilities', icon: FaBolt, route: '/dashboard/utilities' },
    { name: 'Settings', icon: FaCog, route: '/dashboard/settings' },
    { name: 'Notifications', icon: FaBell, route: '/dashboard/notifications' },
    { name: 'Night Mode', icon: FaMoon, route: '/dashboard/night-mode' },
    { name: 'Logout', icon: FaSignOutAlt, route: '/auth/logout' },
  ];

  return (
    <aside className="w-20 bg-gray-900 h-screen flex flex-col items-center py-4 space-y-6">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.route}
          className="flex flex-col items-center text-gray-400 hover:text-white"
        >
          <item.icon className="h-6 w-6" />
          <span className="text-xs mt-1">{item.name}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
