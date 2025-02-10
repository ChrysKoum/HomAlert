// client/src/components/ActivityTable.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivityTable = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get('/api/activity-logs')
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error('Error fetching activity logs:', error);
      });
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
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
    </div>
  );
};

export default ActivityTable;
