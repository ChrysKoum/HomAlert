import React from 'react';
import { FaLock, FaKey, FaShieldAlt, FaDesktop, FaChevronRight } from 'react-icons/fa';

const SecurityItem = ({ icon: Icon, title, description, onUpdate }) => (
  <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-shadow">
    <div className="flex items-center">
      <Icon className="h-8 w-8 text-blue-500 mr-5 flex-shrink-0" />
      <div>
        <h3 className="text-md font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
    <button
      onClick={onUpdate}
      className="flex items-center text-sm bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
    >
      Update <FaChevronRight className="ml-1.5 h-3 w-3" />
    </button>
  </div>
);

const SecuritySettings = () => {
  // Placeholder functions for update actions
  const handleUpdatePassword = () => console.log('Update Password');
  const handleUpdatePasskeys = () => console.log('Update Passkeys');
  const handleUpdate2FA = () => console.log('Update 2-Step Verification');
  const handleManageLogins = () => console.log('Manage Logins');
  // TODO: Implement actual update logic, likely opening modals or navigating

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-10">
        <FaShieldAlt className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Security</h1>
        <p className="text-gray-600 mt-2">Manage your account security settings.</p>
      </div>

      <SecurityItem
        icon={FaLock}
        title="Password"
        description="Create or update password."
        onUpdate={handleUpdatePassword}
      />
      <SecurityItem
        icon={FaKey}
        title="Passkeys"
        description="Seamlessly log in using your fingerprint, face or PIN."
        onUpdate={handleUpdatePasskeys}
      />
      <SecurityItem
        icon={FaShieldAlt}
        title="2-Step Verification"
        description="Add an extra layer of security to your account by using a one-time security code."
        onUpdate={handleUpdate2FA}
      />
      <SecurityItem
        icon={FaDesktop}
        title="Manage your logins"
        description="Review the devices and browsers you use to login. You can remove the ones you don't use or recognize."
        onUpdate={handleManageLogins}
      />
    </div>
  );
};

export default SecuritySettings;