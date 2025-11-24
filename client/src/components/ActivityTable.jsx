// client/src/components/ActivityTable.jsx

import React from 'react';

const ActivityTable = ({ activities = [], title = "Recent Activity" }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-500">No activity recorded.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-x-auto">
      <h3 className="text-xl font-semibold p-4 border-b">{title}</h3>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Sensor</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Room</th>
            <th className="py-3 px-6 text-center">Notify</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {activities.map((activity, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <span className="font-medium">{activity.sensor}</span>
              </td>
              <td className="py-3 px-6 text-left">{activity.date}</td>
              <td className="py-3 px-6 text-left">{activity.description}</td>
              <td className="py-3 px-6 text-left">{activity.room}</td>
              <td className="py-3 px-6 text-center">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  {activity.notify}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
