// client/src/components/SensorOverview.jsx

import React from 'react';
import { FaTint, FaGasPump, FaFireAlt, FaSignal } from 'react-icons/fa';

const SensorCard = ({ sensor, data }) => {
  let IconComponent;

  // Determine which icon to use based on sensor type
  switch (sensor) {
    case 'water':
      IconComponent = FaTint;
      break;
    case 'gas':
      IconComponent = FaGasPump;
      break;
    case 'fire':
      IconComponent = FaFireAlt;
      break;
    default:
      IconComponent = FaSignal;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
      <IconComponent className="h-8 w-8 text-blue-500" />
      <div>
        <h3 className="text-lg font-semibold">{sensor.charAt(0).toUpperCase() + sensor.slice(1)} Sensor</h3>
        <p className="text-sm text-gray-600">{data.moistureLevel || data.ppm}</p>
        <div className="flex items-center">
          <span className={`text-${data.indicator.includes('+') ? 'green' : 'red'}-500`}>
            {data.indicator.includes('+') ? '▲' : '▼'} {data.indicator}
          </span>
          <span className="text-xs text-gray-500 ml-2">Avg: {data.average || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

const SensorOverview = ({ sensors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.keys(sensors).map((sensor) => (
        <SensorCard key={sensor} sensor={sensor} data={sensors[sensor]} />
      ))}
    </div>
  );
};

export default SensorOverview;
