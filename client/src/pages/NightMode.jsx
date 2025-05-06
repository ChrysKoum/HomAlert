import React, { useState } from 'react';
import { FaMoon } from 'react-icons/fa';

const NightMode = () => {
  const [isNightModeActive, setIsNightModeActive] = useState(false); // Example state

  const toggleNightMode = () => {
    setIsNightModeActive(!isNightModeActive);
    // Add logic here to actually change themes or settings
    console.log('Night Mode Toggled:', !isNightModeActive);
  };

  return (
    <>
      <div className="p-6 flex flex-col items-center justify-center text-center">
        <FaMoon className={`h-16 w-16 mb-4 ${isNightModeActive ? 'text-indigo-500' : 'text-gray-400'}`} />
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">Night Mode</h1>
        <p className="mb-6 text-gray-600">Adjust settings for nighttime.</p>

        <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-700">Activate Night Mode</span>
            <button
              onClick={toggleNightMode}
              className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none transition-colors duration-200 ease-in-out ${
                isNightModeActive ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
                  isNightModeActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {isNightModeActive
              ? 'Night mode is currently active. Notifications may be silenced and lights dimmed.'
              : 'Activate night mode to adjust system behavior for the evening.'}
          </p>
        </div>
      </div>
    </>
  );
};

export default NightMode;