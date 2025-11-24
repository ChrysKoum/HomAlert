import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SensorOverview from '../components/SensorOverview';
import EventsStatistics from '../components/EventsStatistics'; // Assuming general stats for now
import WeatherWidget from '../components/WeatherWidget';     // Assuming general weather for now
import ActivityTable from '../components/ActivityTable';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Kitchen = () => {
  const [roomData, setRoomData] = useState(null);
  const [sensors, setSensors] = useState({});
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/api/room/kitchen') // Fetch data for the kitchen
      .then((response) => {
        setRoomData(response.data);
        setSensors(response.data.sensors || {});
        setActivities(response.data.activities || []);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching kitchen data:', err);
        setError('Failed to load kitchen data.');
        setSensors({});
        setActivities([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingSpinner message="Loading Kitchen Overview..." />;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!roomData) return <div className="p-6">No data available for Kitchen.</div>;


  return (
    <>

      {/* Kitchen Content */}
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{roomData.room} Overview</h1>

        {/* Sensor Overview Cards - Pass kitchen sensors */}
        <SensorOverview sensors={sensors} />

        {/* Events Statistics & Weather Section (Using general data for now) */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Events Statistics Section */}
          <div className="w-full lg:w-8/12 xl:w-9/12">
             {/* Pass general stats or modify EventsStatistics to accept filtered data */}
            <EventsStatistics />
          </div>

          {/* Weather Widget */}
          <div className="w-full lg:w-4/12 xl:w-3/12">
            {/* Pass general weather or modify WeatherWidget */}
            <WeatherWidget />
          </div>
        </div>

        {/* Activity Table - Pass kitchen activities */}
        <ActivityTable activities={activities} title="Kitchen Activity Log" />
      </div>
    </>
  );
};

export default Kitchen;