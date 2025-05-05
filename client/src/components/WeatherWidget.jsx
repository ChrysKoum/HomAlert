import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaSun,
  FaCloud,
  FaCloudSun, // Example for partly cloudy
  FaThermometerHalf,
  FaTint,
  FaWind,
  FaArrowUp,
} from 'react-icons/fa'; // Using react-icons/fa as an example

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/weather') // Replace with your actual API endpoint
      .then((response) => {
        // Simulate the structure from the MUI example for easier mapping
        const apiData = response.data;
        setWeather({
          currentTemp: `${apiData.current.temperature}°C`, // Assuming temperature is in Celsius
          dayTime: apiData.current.condition, // Or derive from time/condition
          weatherCondition: apiData.current.condition.toLowerCase(), // e.g., 'sunny', 'cloudy', 'partly cloudy'
          metrics: [
            {
              icon: FaThermometerHalf,
              label: 'Home Temperature',
              value: `${apiData.home.temperature.value}°C`,
              change: apiData.home.temperature.indicator, // e.g., '+3°C'
            },
            {
              icon: FaTint,
              label: 'Home Humidity',
              value: `${apiData.home.humidity.value}%`,
              change: apiData.home.humidity.indicator, // e.g., '+6%'
            },
            {
              icon: FaWind,
              label: 'Air Quality',
              value: `${apiData.home.aqi.value} AQI`,
              change: apiData.home.aqi.indicator, // e.g., '+10AQI'
            },
          ],
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching weather data:', err);
        setError('Could not load weather data.');
        setLoading(false);
      });
  }, []);

  const renderWeatherIcon = (condition) => {
    // Basic example, expand as needed
    switch (condition) {
      case 'sunny':
      case 'clear':
        return <FaSun className="text-4xl text-yellow-500" />;
      case 'cloudy':
        return <FaCloud className="text-4xl text-gray-500" />;
      case 'partly cloudy':
      case 'scattered clouds':
        return (
          <div className="relative w-12 h-10">
            <FaCloud className="text-4xl text-gray-500 absolute top-0 left-1" />
            <FaSun className="text-2xl text-yellow-500 absolute top-[-2px] left-[-2px]" />
          </div>
        );
      default: // Default or unknown condition
        return <FaCloudSun className="text-4xl text-gray-600" />;
    }
  };

  if (loading) return <div className="bg-white shadow rounded-lg p-4 text-center text-gray-500">Loading Weather...</div>;
  if (error) return <div className="bg-white shadow rounded-lg p-4 text-center text-red-500">{error}</div>;
  if (!weather) return null; // Should not happen if loading/error handled

  return (
    <div className="bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 rounded-2xl p-4 h-full flex flex-col">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-3xl font-medium">{weather.currentTemp}</h2>
          <p className="text-sm text-gray-500">{weather.dayTime}</p>
        </div>
        {renderWeatherIcon(weather.weatherCondition)}
      </div>

      <hr className="border-gray-100 my-3" />

      {/* Metrics Section */}
      <div className="flex-grow flex flex-col gap-4 mb-4">
        {weather.metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gray-100 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <metric.icon className="text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500 leading-tight block">{metric.label}</p>
                <p className="text-base font-medium">{metric.value}</p>
              </div>
            </div>
            {metric.change && (
              <div className="flex items-center text-red-500">
                <FaArrowUp className="text-xs mr-0.5" />
                <span className="text-xs font-medium">{metric.change}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="text-center mt-auto">
        <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
          See All
        </a>
      </div>
    </div>
  );
};

export default WeatherWidget;