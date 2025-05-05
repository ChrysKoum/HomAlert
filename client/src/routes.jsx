import React from 'react';
import Dashboard from './pages/Dashboard';
// Removed Sensors import, assuming specific room pages replace it
import Kitchen from './pages/Kitchen'; // Added
import Bathroom from './pages/Bathroom'; // Added
import LivingRoom from './pages/LivingRoom'; // Added
import Utilities from './pages/Utilities';
import Settings from './pages/Settings';
import Alerts from './pages/Alerts';
import Notifications from './pages/Notifications';
import NightMode from './pages/NightMode';
import Information from './pages/Information'; 
import Logout from './pages/Logout';
import ErrorPage from './pages/ErrorPage';

const routes = [
  { path: '/dashboard', element: <Dashboard /> },
  // Specific room routes
  { path: '/dashboard/kitchen', element: <Kitchen /> },
  { path: '/dashboard/bathroom', element: <Bathroom /> },
  { path: '/dashboard/living', element: <LivingRoom /> },
  // Other utility/management routes
  { path: '/dashboard/utilities', element: <Utilities /> },
  { path: '/dashboard/settings', element: <Settings /> },
  { path: '/dashboard/alerts', element: <Alerts /> }, // Route for active alerts
  { path: '/dashboard/notifications', element: <Notifications /> }, // Route for general notifications
  { path: '/dashboard/night-mode', element: <NightMode /> },
  { path: '/dashboard/information', element: <Information /> }, // Route for info page
  // Auth and fallback
  { path: '/auth/logout', element: <Logout /> },
  { path: '*', element: <ErrorPage /> },
];

export default routes;