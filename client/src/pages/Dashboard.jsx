// client/src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopNavBar from '../components/TopNavBar';
import Sidebar from '../components/Sidebar';
import SensorOverview from '../components/SensorOverview';
import EventsStatistics from '../components/EventsStatistics';
import WeatherWidget from '../components/WeatherWidget';
import ActivityTable from '../components/ActivityTable';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [sensors, setSensors] = useState({});
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    // Fetch dashboard data
    axios
      .get('/api/dashboard-data')
      .then((response) => {
        setDashboardData(response.data);
        setUserName(response.data.user.name);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });

    // Fetch sensors data
    axios
      .get('/api/sensors')
      .then((response) => {
        setSensors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sensors data:', error);
      });
  }, []);

  if (!dashboardData) return <div>Loading Dashboard...</div>;

  return (
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Top Navigation Bar */}
        <TopNavBar userName={userName} />

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Sensor Overview Cards */}
          <SensorOverview sensors={sensors} />

          {/* Events Statistics Section */}
          <EventsStatistics />

          {/* Weather Widget */}
          <WeatherWidget />

          {/* Activity Table */}
          <ActivityTable />
        </div>
      </div>
  );
};

export default Dashboard;
