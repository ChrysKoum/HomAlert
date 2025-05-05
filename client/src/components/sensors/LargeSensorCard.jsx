import React from 'react';
import {
  FaTint, FaGasPump, FaThermometerHalf, FaWater, // Humidity might use FaWater too
  FaWifi, FaSignal
} from 'react-icons/fa';

const LargeSensorCard = ({ sensorType, data }) => {
  let IconComponent;
  switch (sensorType?.toLowerCase()) {
    case 'water': IconComponent = FaTint; break;
    case 'gas': IconComponent = FaGasPump; break;
    case 'temperature': IconComponent = FaThermometerHalf; break;
    case 'humidity': IconComponent = FaWater; break; // Example icon
    default: IconComponent = FaSignal;
  }

  const value = data?.moistureLevel || data?.ppm || data?.value || data?.status || 'N/A';
  const isPositiveTrend = data?.indicator?.includes('+');
  // Trend color logic: Red for increase (often bad for gas/water), Green otherwise. Adjust if needed.
  const trendColor = (sensorType === 'gas' || sensorType === 'water') && isPositiveTrend ? 'text-red-500' : 'text-green-500';
  const trendArrow = isPositiveTrend ? '↑' : '↓';

  // Capitalize sensor type name
  const displayName = sensorType ? sensorType.charAt(0).toUpperCase() + sensorType.slice(1) : 'Sensor';


  return (
    // Increased width and padding
    <div className="bg-white shadow rounded-lg p-5 w-64 flex-shrink-0"> {/* Increased width to w-64 */}
      <div className="flex justify-between items-start mb-3"> {/* Increased margin-bottom */}
        <div className="flex items-center space-x-2">
          <IconComponent className="h-5 w-5 text-gray-600" />
          <h3 className="text-base font-medium text-gray-700">{displayName}</h3> {/* Slightly larger text */}
        </div>
        <FaWifi className="h-4 w-4 text-blue-500" />
      </div>
      <p className="text-4xl font-semibold text-gray-900 mb-4">{value}</p> {/* Larger text, increased margin */}
      <div className="flex justify-between items-center text-sm"> {/* Larger text */}
        {data?.indicator ? (
          <span className={`font-medium ${trendColor}`}>
            {trendArrow} {data.indicator}
          </span>
        ) : <span>&nbsp;</span>}
        {data?.average && (
          <span className="text-gray-500">{data.average} avg.</span>
        )}
      </div>
    </div>
  );
};

export default LargeSensorCard;