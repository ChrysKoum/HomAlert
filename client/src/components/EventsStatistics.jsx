// client/src/components/EventsStatistics.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const EventsStatistics = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('20 September 2024');
  const [timeframe, setTimeframe] = useState('Day'); // Options: Day, Week, Month

  useEffect(() => {
    axios
      .get('/api/events-statistics')
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching events statistics:', error);
      });
  }, [timeframe]);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Events Statistics</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded ${
              timeframe === 'Day' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setTimeframe('Day')}
          >
            Day
          </button>
          <button
            className={`px-3 py-1 rounded ${
              timeframe === 'Week' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setTimeframe('Week')}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 rounded ${
              timeframe === 'Month' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setTimeframe('Month')}
          >
            Month
          </button>
        </div>
      </div>
      <div className="text-gray-500 mb-2">{selectedDate}</div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip formatter={(value) => value} />
          <Line type="monotone" dataKey="events" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventsStatistics;
