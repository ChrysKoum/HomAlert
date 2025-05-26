import React from 'react';

// Accept isOn state and onToggle handler function as props
const ToggleSwitch = ({ isOn, onToggle }) => (
  <div
    onClick={onToggle} 
    className={`relative inline-flex items-center h-6 w-[60px] rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
      isOn ? 'bg-blue-500' : 'bg-gray-300' 
    }`}
  >
    {/* Sliding Knob */}
    <span
      className={`absolute top-[2px] left-[2px] h-5 w-7 rounded-full bg-white transition-transform duration-300 ease-in-out shadow ${
        isOn ? 'translate-x-[28px]' : 'translate-x-0'
      }`}
    />

    {/* Text Layer */}
    <div className="absolute inset-0 flex items-center px-[6px]">
      <span className={`flex-1 text-center text-[10px] font-bold transition-colors duration-300 ${
        isOn ? 'text-white' : 'text-gray-200'
      }`}>
        ON
      </span>
      <span className={`flex-1 text-center text-[10px] font-bold transition-colors duration-300 ${
        isOn ? 'text-gray-200' : 'text-gray-700'
      }`}>
        OFF
      </span>
    </div>
  </div>
);

export default ToggleSwitch;