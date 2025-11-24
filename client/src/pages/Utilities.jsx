import React from 'react';

const Utilities = () => {
  // Placeholder data
  const utilityData = [
    { name: 'Electricity Usage', value: '150 kWh', trend: '+5%', period: 'This Month' },
    { name: 'Water Consumption', value: '3.5 m³', trend: '-2%', period: 'This Month' },
    { name: 'Gas Usage', value: '20 Therms', trend: '+1%', period: 'This Month' },
  ];

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Utilities Overview</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">Track your home's utility consumption.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {utilityData.map((utility, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">{utility.name}</h2>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{utility.value}</p>
              <div className="flex justify-between items-center mt-4 text-sm">
                <span className="text-gray-500 dark:text-gray-400">{utility.period}</span>
                <span className={`font-semibold ${utility.trend.startsWith('+') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                  {utility.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Add charts or more detailed breakdowns here */}
      </div>
    </>
  );
};

export default Utilities;