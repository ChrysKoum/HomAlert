// filepath: client/src/pages/Alerts.jsx
import React from 'react';
import { FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const Alerts = () => {
  // Placeholder data for active alerts
  const activeAlerts = [
    { id: 'alert-1', severity: 'critical', description: 'Smoke detected in Kitchen - Sensor KSM-01', timestamp: '2024-07-27 10:30:00' },
    { id: 'alert-2', severity: 'warning', description: 'Water leak detected in Basement - Sensor BWS-01', timestamp: '2024-07-27 09:15:00' },
  ];

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Active System Alerts</h1>
        <p className="mb-6 text-gray-600 dark:text-white">Critical and ongoing alerts requiring attention.</p>
        <div className="space-y-4">
          {activeAlerts.length > 0 ? (
            activeAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-start p-4 rounded-lg shadow ${
                alert.severity === 'critical' ? 'bg-red-100 border-l-4 border-red-500' : 'bg-yellow-100 border-l-4 border-yellow-500'
              }`}>
                <FaExclamationTriangle className={`h-6 w-6 mr-3 flex-shrink-0 ${
                  alert.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
                }`} />
                <div className="flex-1">
                  <p className={`font-semibold ${alert.severity === 'critical' ? 'text-red-800' : 'text-yellow-800'}`}>
                    {alert.description}
                  </p>
                  <p className="text-sm text-gray-600">{new Date(alert.timestamp).toLocaleString()}</p>
                </div>
                <button className="ml-4 text-gray-500 hover:text-gray-700">
                  <FaTimesCircle className="h-5 w-5" /> {/* Placeholder for dismiss action */}
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <p className="text-gray-500">No active alerts at this time.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Alerts;