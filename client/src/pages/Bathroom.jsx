import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SensorOverview from '../components/SensorOverview';
import EventsStatistics from '../components/EventsStatistics';
import WeatherWidget from '../components/WeatherWidget';
import ActivityTable from '../components/ActivityTable';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Bathroom = () => {
  const [roomData, setRoomData] = useState(null);
  const [sensors, setSensors] = useState({});
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/api/room/bathroom') // Fetch data for the bathroom
      .then((response) => {
        setRoomData(response.data);
        setSensors(response.data.sensors || {});
        setActivities(response.data.activities || []);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching bathroom data:', err);
        setError('Failed to load bathroom data.');
        setSensors({});
        setActivities([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingSpinner message="Loading Bathroom Overview..." />;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!roomData) return <div className="p-6">No data available for Bathroom.</div>;

  return (
    <>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">{roomData.room} Overview</h1>
        <SensorOverview sensors={sensors} />
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          <div className="w-full lg:w-8/12 xl:w-9/12">
            <EventsStatistics />
          </div>
          <div className="w-full lg:w-4/12 xl:w-3/12">
            <WeatherWidget />
          </div>
        </div>
        <ActivityTable activities={activities} title="Bathroom Activity Log" />
      </div>
    </>
  );
};

export default Bathroom;