import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import ToggleSwitch from '../common/ToggleSwitch'; // Adjust path if needed

const NotificationCategory = ({ title, children }) => (
  <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow mb-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const NotificationToggleItem = ({ label, smsOn, onSmsToggle, emailOn, onEmailToggle }) => (
  <div className="pb-3 border-b border-gray-200 last:border-b-0">
    <p className="text-md font-medium text-gray-700 mb-2">{label}</p>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-4">
      <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto">
        <span className="text-sm text-gray-600 mr-3">SMS</span>
        <ToggleSwitch isOn={smsOn} onToggle={onSmsToggle} srText={`Toggle SMS for ${label}`} />
      </div>
      <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto">
        <span className="text-sm text-gray-600 mr-3">Email</span>
        <ToggleSwitch isOn={emailOn} onToggle={onEmailToggle} srText={`Toggle Email for ${label}`} />
      </div>
    </div>
  </div>
);

const NotificationSettings = () => {
  // Example state, replace with actual state management
  const [sensorNotifications, setSensorNotifications] = useState({
    dangerDetected: { sms: true, email: false },
    notWorking: { sms: false, email: true },
    restarted: { sms: true, email: true },
    newSensorAdded: { sms: false, email: false },
  });

  const handleToggle = (category, type) => {
    setSensorNotifications(prev => ({
      ...prev,
      [category]: { ...prev[category], [type]: !prev[category][type] }
    }));
    // TODO: Add API call to save preference
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <FaBell className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        <p className="text-gray-600 mt-2">Choose how you want to get updates about sensors or new devices.</p>
      </div>

      <NotificationCategory title="Sensors">
        <NotificationToggleItem
          label="Danger is detected"
          smsOn={sensorNotifications.dangerDetected.sms}
          onSmsToggle={() => handleToggle('dangerDetected', 'sms')}
          emailOn={sensorNotifications.dangerDetected.email}
          onEmailToggle={() => handleToggle('dangerDetected', 'email')}
        />
        <NotificationToggleItem
          label="Not working"
          smsOn={sensorNotifications.notWorking.sms}
          onSmsToggle={() => handleToggle('notWorking', 'sms')}
          emailOn={sensorNotifications.notWorking.email}
          onEmailToggle={() => handleToggle('notWorking', 'email')}
        />
        <NotificationToggleItem
          label="Restarted"
          smsOn={sensorNotifications.restarted.sms}
          onSmsToggle={() => handleToggle('restarted', 'sms')}
          emailOn={sensorNotifications.restarted.email}
          onEmailToggle={() => handleToggle('restarted', 'email')}
        />
        <NotificationToggleItem
          label="New sensor added"
          smsOn={sensorNotifications.newSensorAdded.sms}
          onSmsToggle={() => handleToggle('newSensorAdded', 'sms')}
          emailOn={sensorNotifications.newSensorAdded.email}
          onEmailToggle={() => handleToggle('newSensorAdded', 'email')}
        />
      </NotificationCategory>
      {/* Add more categories like "System Updates", "Account Activity" if needed */}
    </div>
  );
};

export default NotificationSettings;