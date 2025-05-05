// filepath: client/src/pages/Information.jsx
import React from 'react';
import TopNavBar from '../components/TopNavBar';

const Information = () => {
  return (
    <>
      <TopNavBar userName="User" />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Information</h1>
        <p className="mb-6 text-gray-600">General information about the HomAlert system.</p>
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <section>
            <h2 className="text-xl font-medium text-gray-700 mb-2">About HomAlert</h2>
            <p className="text-gray-600">
              HomAlert is a smart home monitoring and emergency alert system designed to provide peace of mind.
              It integrates various sensors to detect potential hazards like smoke, water leaks, and motion,
              sending timely notifications to keep you informed.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-gray-700 mb-2">Support</h2>
            <p className="text-gray-600">
              For support, please visit our FAQ section or contact us through the main application portal.
            </p>
          </section>
          {/* Add more relevant information sections */}
        </div>
      </div>
    </>
  );
};

export default Information;