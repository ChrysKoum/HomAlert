import React from 'react';
import { FaBell, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const Notifications = () => {
  // Placeholder data
  const notifications = [
    { id: 1, type: 'alert', icon: FaExclamationTriangle, text: 'Smoke detected in Kitchen!', time: '2 mins ago', read: false },
    { id: 2, type: 'info', icon: FaInfoCircle, text: 'System update scheduled for 2 AM.', time: '1 hour ago', read: false },
    { id: 3, type: 'alert', icon: FaExclamationTriangle, text: 'Motion detected at Front Door.', time: '3 hours ago', read: true },
    { id: 4, type: 'info', icon: FaBell, text: 'Low battery on Living Room sensor.', time: '1 day ago', read: true },
  ];

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Notifications</h1>
        <p className="mb-6 text-gray-600">Recent alerts and system messages.</p>
        <div className="bg-white shadow rounded-lg">
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li key={notification.id} className={`p-4 flex items-start space-x-3 ${!notification.read ? 'bg-blue-50' : ''}`}>
                <notification.icon className={`h-5 w-5 mt-1 flex-shrink-0 ${notification.type === 'alert' ? 'text-red-500' : 'text-blue-500'}`} />
                <div className="flex-1">
                  <p className={`text-sm ${!notification.read ? 'font-semibold' : 'font-normal'} text-gray-800`}>{notification.text}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
                {!notification.read && <span className="h-2 w-2 mt-2 bg-blue-500 rounded-full" aria-hidden="true"></span>}
              </li>
            ))}
          </ul>
          {notifications.length === 0 && (
            <p className="text-center py-10 text-gray-500">No new notifications.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;