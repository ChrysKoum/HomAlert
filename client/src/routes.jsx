import React from 'react';
import Dashboard from './pages/Dashboard';
import Kitchen from './pages/Kitchen';
import Bathroom from './pages/Bathroom';
import LivingRoom from './pages/LivingRoom';
import Utilities from './pages/Utilities';
import Settings from './pages/Settings';
import Alerts from './pages/Alerts';
import Notifications from './pages/Notifications';
import Information from './pages/Information';
import Logout from './pages/Logout';
import ErrorPage from './pages/ErrorPage';
import SensorDetailPage from './pages/SensorDetailPage'; 

const routes = [
  { path: '/', element: <Dashboard /> }, 
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/dashboard/kitchen', element: <Kitchen /> },
  { path: '/dashboard/kitchen/:sensorId', element: <SensorDetailPage /> },
  { path: '/dashboard/bathroom', element: <Bathroom /> },
  { path: '/dashboard/bathroom/:sensorId', element: <SensorDetailPage /> },
  { path: '/dashboard/living', element: <LivingRoom /> },
  { path: '/dashboard/living/:sensorId', element: <SensorDetailPage /> },
  { path: '/dashboard/utilities', element: <Utilities /> },
  { path: '/dashboard/utilities/:sensorId', element: <SensorDetailPage /> },
  { path: '/dashboard/settings', element: <Settings /> },
  { path: '/dashboard/alerts', element: <Alerts /> },
  { path: '/dashboard/notifications', element: <Notifications /> },
  { path: '/dashboard/information', element: <Information /> },
  { path: '/auth/logout', element: <Logout /> },
  { path: '*', element: <ErrorPage /> },
];

export default routes;