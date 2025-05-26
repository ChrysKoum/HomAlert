import React from 'react';

const ToggleSwitch = ({ isOn, onToggle, disabled = false, srText = "Toggle" }) => {
  return (
    <button
      onClick={!disabled ? onToggle : undefined}
      className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none transition-colors duration-200 ease-in-out ${
        isOn ? 'bg-blue-600' : 'bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled}
      aria-pressed={isOn}
    >
      <span className="sr-only">{srText}</span>
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;