import React from 'react';
import TopNavBar from '../components/TopNavBar'; // Assuming you want the navbar here too

const Sensors = () => {
  // Placeholder data - replace with actual sensor data fetching
  const sensorList = [
    { id: 1, name: 'Living Room Motion', status: 'Active', type: 'Motion' },
    { id: 2, name: 'Kitchen Smoke Detector', status: 'OK', type: 'Smoke' },
    { id: 3, name: 'Basement Water Sensor', status: 'OK', type: 'Water' },
    { id: 4, name: 'Front Door Contact', status: 'Closed', type: 'Contact' },
  ];

  return (
    <>
      <TopNavBar userName="User" /> {/* Pass appropriate user name */}
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Sensors Management</h1>
        <p className="mb-6 text-gray-600">View and manage your connected sensors.</p>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sensorList.map((sensor) => (
                <tr key={sensor.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sensor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sensor.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      sensor.status === 'Active' || sensor.status === 'OK' || sensor.status === 'Closed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {sensor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-blue-600 hover:text-indigo-900">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Sensors;