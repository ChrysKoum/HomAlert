import React from 'react';
import TopNavBar from '../components/TopNavBar';

const Settings = () => {
  return (
    <>
      <TopNavBar userName="User" />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Settings</h1>
        <p className="mb-6 text-gray-600">Configure your application and device settings.</p>

        {/* Example Settings Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-medium mb-4 text-gray-700">Profile Settings</h2>
          {/* Add form fields for profile settings */}
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="username" defaultValue="Kostantine" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" defaultValue="kostantine@example.com" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Profile</button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4 text-gray-700">Notification Settings</h2>
          {/* Add toggles/options for notification preferences */}
          <div className="space-y-2">
             <div className="flex items-center justify-between">
               <span className="text-sm text-gray-600">Email Notifications</span>
               <button className="w-10 h-5 bg-gray-300 rounded-full p-0.5 flex items-center focus:outline-none">
                 <span className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-0 transition-transform duration-200 ease-in-out"></span>
               </button>
             </div>
             {/* Add more notification toggles */}
          </div>
        </div>
        {/* Add more settings sections (e.g., Security, Devices) */}
      </div>
    </>
  );
};

export default Settings;