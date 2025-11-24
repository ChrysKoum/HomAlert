// client/src/components/EventsStatistics.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const EventsStatistics = () => {
  const [chartData, setChartData] = useState([]);
  const [displayDate, setDisplayDate] = useState(''); // To show date/week/month range
  const [timeframe, setTimeframe] = useState('Day'); // Day, Week, Month
  const [xAxisKey, setXAxisKey] = useState('hour'); // Key for X-axis data (hour, day, date)

  useEffect(() => {
    // Use the consolidated endpoint
    const apiUrl = `/api/statistics`;
    let newXAxisKey = 'hour'; // Default

    // Determine xAxisKey based on timeframe
    if (timeframe === 'Week') {
      newXAxisKey = 'day';
    } else if (timeframe === 'Month') {
      newXAxisKey = 'date';
    }

    axios
      // Pass timeframe as a query parameter
      .get(apiUrl, { params: { timeframe: timeframe } })
      .then((response) => {
        const responseData = response.data;
        setChartData(responseData.data);
        setXAxisKey(newXAxisKey);

        // Update display date (logic remains similar)
        if (timeframe === 'Day') {
          setDisplayDate(responseData.date || 'Today');
        } else if (timeframe === 'Week') {
          setDisplayDate(`${responseData.weekStart} - ${responseData.weekEnd}`);
        } else if (timeframe === 'Month') {
          setDisplayDate(responseData.month || 'This Month');
        }
      })
      .catch((error) => {
        console.error(`Error fetching ${timeframe} statistics:`, error);
        setChartData([]);
        setDisplayDate('Error loading data');
      });
  }, [timeframe]); // Re-run effect when timeframe changes

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Events Statistics</h3>
        <div className="flex space-x-2">
          {['Day', 'Week', 'Month'].map((tf) => (
            <button
              key={tf}
              className={`px-3 py-1 rounded ${
                timeframe === tf ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div className="text-gray-500 mb-2">{displayDate}</div> {/* Use dynamic display date */}
      <ResponsiveContainer width="100%" height={300}>
        {/* Use chartData and dynamic xAxisKey */}
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ececec" />
          {/* Use dynamic dataKey for XAxis */}
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip formatter={(value) => `${value} events`} />
          <Area
            type="monotone"
            dataKey="events" // Assuming 'events' is the key for the value in all datasets
            stroke="#8884d8"
            strokeWidth={3}
            fill="url(#colorEvents)"
            dot={{ r: 4, stroke: '#fff', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventsStatistics;
