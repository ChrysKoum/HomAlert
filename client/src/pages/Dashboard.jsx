// client/src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SensorOverview from '../components/SensorOverview';
import EventsStatistics from '../components/EventsStatistics';
import WeatherWidget from '../components/WeatherWidget';
import ActivityTable from '../components/ActivityTable';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [sensors, setSensors] = useState({});
  const [activities, setActivities] = useState([]); // Add state for activities
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Use Promise.all to fetch multiple data points concurrently
    Promise.all([
      axios.get('/api/dashboard-data'),
      axios.get('/api/sensors'),
      axios.get('/api/activity-logs') // Fetch all activity logs
    ])
    .then(([dashboardRes, sensorsRes, activitiesRes]) => {
      setDashboardData(dashboardRes.data);
      setSensors(sensorsRes.data || {});
      setActivities(activitiesRes.data || []); // Set the fetched activities
    })
    .catch((err) => {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data.');
      // Set defaults or handle specific errors per request if needed
      setSensors({});
      setActivities([]);
    })
    .finally(() => {
      setIsLoading(false);
    });

  }, []); // Empty dependency array ensures this runs once on mount

  // Display loading or error states
  if (isLoading) return <LoadingSpinner message="Loading Dashboard..." />; // Use the spinner
  if (error) return <div className="p-4 md:p-6 text-red-600 dark:text-red-400">{error}</div>; // Adjusted padding
  if (!dashboardData) return <div className="p-4 md:p-6">No dashboard data available.</div>; // Adjusted padding

  return (
    <>
      {/* Dashboard Content */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        
        <SensorOverview sensors={sensors} />

        {/* Events Statistics & Weather Section */}
        <div className="flex flex-wrap lg:flex-nowrap gap-4 md:gap-6">
          {/* Events Statistics Section */}
          <div className="w-full lg:w-8/12 xl:w-9/12">
            <EventsStatistics />
          </div>

          {/* Weather Widget */}
          <div className="w-full lg:w-4/12 xl:w-3/12">
            <WeatherWidget />
          </div>
        </div>

        {/* Activity Table - Pass all activities */}
        <ActivityTable activities={activities} title="Recent Activity" />
      </div>
    </>
  );
};

export default Dashboard;
