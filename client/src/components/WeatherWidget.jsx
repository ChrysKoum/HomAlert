// client/src/components/WeatherWidget.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowUp } from 'react-icons/fa';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get('/api/weather')
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  if (!weather) return <div>Loading Weather...</div>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Weather</h3>
        <a href="#" className="text-blue-500 hover:underline">
          See All
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <div className="text-4xl font-bold">{weather.current.temperature}</div>
          <div className="text-gray-600">{weather.current.condition}</div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span>Home Temperature</span>
            <div className="flex items-center text-red-500">
              <FaArrowUp className="h-4 w-4 mr-1" />
              {weather.home.temperature.value} ({weather.home.temperature.indicator})
            </div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>Home Humidity</span>
            <div className="flex items-center text-red-500">
              <FaArrowUp className="h-4 w-4 mr-1" />
              {weather.home.humidity.value} ({weather.home.humidity.indicator})
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Air Quality Index (AQI)</span>
            <div className="flex items-center text-red-500">
              <FaArrowUp className="h-4 w-4 mr-1" />
              {weather.home.aqi.value} ({weather.home.aqi.indicator})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
