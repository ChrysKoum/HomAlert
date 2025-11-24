import React from 'react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  // Size variants
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;
  
  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-[200px]">
      <svg
        className={`animate-spin ${spinnerSize} text-blue-600 dark:text-blue-400`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {message && <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;