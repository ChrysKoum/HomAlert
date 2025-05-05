import React, { useState } from 'react';
import ToggleSwitch from '../common/ToggleSwitch';
import {
  FaFireAlt,
  FaRunning,
  FaSmog,
  FaDoorClosed,
  FaWindowMaximize,
  FaTint,
  FaTemperatureHigh,
  FaGasPump,
  FaGlobe,
  FaWifi,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSignal,
  FaExclamationCircle // Import for Critical status
} from 'react-icons/fa';

const SmallSensorCard = ({ sensorType, data }) => {
  // Determine initial toggle state based on 'ON' or 'Active', but not 'Offline' or 'Critical'
  const initialToggleState = (data?.status === 'ON' || data?.status === 'Active') && data?.status !== 'Offline' && data?.status !== 'Critical';
  const [isToggledOn, setIsToggledOn] = useState(initialToggleState);

  const handleToggle = () => {
    if (data?.status === 'Offline' || data?.status === 'Critical') {
      console.log(`Cannot toggle sensor ${sensorType} due to status: ${data.status}`);
      return;
    }
    setIsToggledOn(!isToggledOn);
    console.log(`Sensor ${sensorType} toggled: ${!isToggledOn ? 'ON' : 'OFF'}`);
  };

  let IconComponent;
  let statusIcon = null;
  let wifiColor = 'text-blue-500'; // Default Wifi color

  switch (sensorType?.toLowerCase()) {
    case 'fire': IconComponent = FaFireAlt; break;
    case 'motion': IconComponent = FaRunning; break;
    case 'smoke': IconComponent = FaSmog; break;
    case 'door': IconComponent = FaDoorClosed; break;
    case 'window': IconComponent = FaWindowMaximize; break;
    case 'water': IconComponent = FaTint; break;           // Water droplet icon
    case 'temperature': IconComponent = FaTemperatureHigh; break; // Temperature icon
    case 'humidity': IconComponent = FaTint; break;        // Reuse water droplet for humidity
    case 'gas': IconComponent = FaGasPump; break;           // Gas pump icon
    case 'earthquake': IconComponent = FaGlobe; break;      // Globe for earthquake
    default: IconComponent = FaSignal;
  }

  // Determine Status Icon and Wifi Color based on priority: Critical > Offline > Warning > OK
  if (data?.status === 'Critical') {
    statusIcon = <FaExclamationCircle className="h-7 w-7 text-red-600" />;
    wifiColor = 'text-red-600';
  } else if (data?.status === 'Offline') {
    statusIcon = <FaExclamationTriangle className="h-7 w-7 text-gray-400" />;
    wifiColor = 'text-gray-400';
  } else if (data?.indicator === 'Warning' || data?.status === 'Alert') {
    statusIcon = <FaExclamationTriangle className="h-7 w-7 text-orange-500" />;
    wifiColor = 'text-orange-500';
  } else {
    statusIcon = <FaCheckCircle className="h-7 w-7 text-blue-500" />;
  }

  const displayName = sensorType ? sensorType.charAt(0).toUpperCase() + sensorType.slice(1) : 'Sensor';

  // Render value vs status
  const detail = data?.value || data?.status || data?.magnitude || '';

  return (
    <div className="bg-white shadow rounded-lg p-3 pb-2 w-36 flex-shrink-0 flex flex-col items-center space-y-1.5">
      <div className="flex justify-between items-center w-full">
        <IconComponent className={`h-7 w-7 ${data?.status === 'Offline' ? 'text-gray-400' : 'text-gray-600'}`} />
        <span className="text-md font-medium text-gray-600 truncate w-full text-center">{displayName}</span>
        <FaWifi className={`h-6 w-6 ${wifiColor}`} />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center min-h-[28px]">
        {statusIcon}
        {detail && <span className="text-sm text-gray-700 mt-1">{detail}</span>}
      </div>

      <div className={`${(data?.status === 'Offline' || data?.status === 'Critical') ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <ToggleSwitch isOn={isToggledOn} onToggle={handleToggle} />
      </div>
    </div>
  );
};

export default SmallSensorCard;
