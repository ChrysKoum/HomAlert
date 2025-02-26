import React from 'react';
import Dashboard from './pages/Dashboard';
import Sensors from './pages/Sensors';
import Utilities from './pages/Utilities';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import NightMode from './pages/NightMode';
import Logout from './pages/Logout';
import ErrorPage from './pages/ErrorPage'; // For handling 404 errors

const routes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/dashboard/sensors', element: <Sensors /> },
  { path: '/dashboard/utilities', element: <Utilities /> },
  { path: '/dashboard/settings', element: <Settings /> },
  { path: '/dashboard/notifications', element: <Notifications /> },
  { path: '/dashboard/night-mode', element: <NightMode /> },
  { path: '/auth/logout', element: <Logout /> },
  { path: '*', element: <ErrorPage /> }, // Fallback for undefined routes
];

export default routes;
