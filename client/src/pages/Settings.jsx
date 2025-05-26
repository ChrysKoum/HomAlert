import React, { useState } from 'react';
import ProfileSettings from '../components/settings/ProfileSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import EmergencyContactsSettings from '../components/settings/EmergencyContactsSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const settingsTabs = ['Profile', 'Security', 'Notifications', 'Emergency Contacts'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <ProfileSettings />;
      case 'Security':
        return <SecuritySettings />;
      case 'Notifications':
        return <NotificationSettings />;
      case 'Emergency Contacts':
        return <EmergencyContactsSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Top Navigation Tabs */}
      <div className="mb-6 sm:mb-8 max-w-5xl mx-auto">
        <div className="border-b border-gray-300">
          <nav className="-mb-px flex justify-center space-x-4 sm:space-x-8 overflow-x-auto" aria-label="Tabs">
            {settingsTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-3 px-2 sm:px-4 border-b-2 font-medium text-sm transition-colors focus:outline-none
                  ${activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area - Rendered based on activeTab */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Settings;
