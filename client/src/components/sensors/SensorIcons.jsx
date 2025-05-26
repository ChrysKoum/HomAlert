import React from 'react';
import {
  FaTint,           // Water
  FaGasPump,        // Gas
  FaFireAlt,        // Fire
  FaRunning,        // Motion
  FaSmog,           // Smoke
  FaTemperatureHigh,// Temperature
  FaWater,          // Humidity (using water drop as placeholder)
  FaDoorOpen,       // Door
  FaWindowMaximize, // Window
  FaSignal,         // Default/Unknown
} from 'react-icons/fa';

export const getSensorIcon = (sensorType) => {
  switch (sensorType?.toLowerCase()) {
    case 'water': return FaTint;
    case 'gas': return FaGasPump;
    case 'fire': return FaFireAlt;
    case 'motion': return FaRunning;
    case 'smoke': return FaSmog;
    case 'temperature': return FaTemperatureHigh;
    case 'humidity': return FaWater; 
    case 'door': return FaDoorOpen;
    case 'window': return FaWindowMaximize;
    default: return FaSignal;
  }
};