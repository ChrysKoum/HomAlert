import React, { useState } from 'react';
import { FaUserPlus, FaUsers, FaTimes, FaFireExtinguisher, FaTint, FaRunning } from 'react-icons/fa';
import { GiSiren as FaSiren} from "react-icons/gi";
import ToggleSwitch from '../common/ToggleSwitch'; // Adjust path if needed

const EmergencyContactItem = ({ name, onRemove }) => (
  <div className="flex items-center justify-between bg-gray-100 px-3 py-1.5 rounded-full text-sm">
    <span className="text-gray-700 font-medium">{name}</span>
    <button onClick={onRemove} className="ml-2 text-gray-500 hover:text-red-500">
      <FaTimes />
    </button>
  </div>
);

const DepartmentToggleItem = ({ icon: Icon, label, description, isOn, onToggle }) => (
  <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex items-start">
        <Icon className="h-7 w-7 text-blue-500 mr-4 mt-1 flex-shrink-0" />
        <div>
          <h4 className="text-md font-semibold text-gray-800">{label}</h4>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      <ToggleSwitch isOn={isOn} onToggle={onToggle} srText={`Toggle ${label}`} />
    </div>
  </div>
);


const EmergencyContactsSettings = () => {
  const [familyContacts, setFamilyContacts] = useState([
    { id: 'dad', name: 'Dad' },
    { id: 'mom', name: 'Mom' },
    { id: 'john', name: 'John' },
  ]);
  // TODO: Implement adding new contacts (e.g., via a modal)
  const handleAddFamilyContact = () => console.log('Add family contact');
  const handleRemoveFamilyContact = (id) => {
    setFamilyContacts(prev => prev.filter(contact => contact.id !== id));
    // TODO: API call to remove contact
  };

  const [departmentSettings, setDepartmentSettings] = useState({
    fire: true,
    gas: true,
    motion: false,
  });

  const handleDepartmentToggle = (department) => {
    setDepartmentSettings(prev => ({ ...prev, [department]: !prev[department] }));
    // TODO: API call to save preference
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <FaSiren className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Emergency Contacts</h1>
        <p className="text-gray-600 mt-2">Choose who you want to be notified in case of emergency.</p>
      </div>

      {/* Family & Friends Contacts */}
      <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaUsers className="mr-2 text-blue-500" /> Family & Friends Contacts
          </h3>
          <button
            onClick={handleAddFamilyContact}
            className="flex items-center text-sm bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded-lg transition-colors"
          >
            <FaUserPlus className="mr-1.5 h-4 w-4" /> Add
          </button>
        </div>
        {familyContacts.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {familyContacts.map(contact => (
              <EmergencyContactItem
                key={contact.id}
                name={contact.name}
                onRemove={() => handleRemoveFamilyContact(contact.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-2">No family or friends contacts added yet.</p>
        )}
      </div>

      {/* Local Emergency Departments */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 ml-1">Local Emergency Departments</h3>
        <div className="space-y-4">
          <DepartmentToggleItem
            icon={FaFireExtinguisher}
            label="Fire Detected"
            description="Call fire department automatically. (If this setting is turned off you will get a confirmation before to proceed.)"
            isOn={departmentSettings.fire}
            onToggle={() => handleDepartmentToggle('fire')}
          />
          <DepartmentToggleItem
            icon={FaTint} // Could be FaSmog or similar for gas
            label="Gas Leakage Detected"
            description="Call fire department and ambulance automatically. (If this setting is turned off you will get a confirmation before to proceed.)"
            isOn={departmentSettings.gas}
            onToggle={() => handleDepartmentToggle('gas')}
          />
          <DepartmentToggleItem
            icon={FaRunning}
            label="Motion Detected"
            description="Call the police automatically. (If this setting is turned off you will get a confirmation before to proceed.)"
            isOn={departmentSettings.motion}
            onToggle={() => handleDepartmentToggle('motion')}
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactsSettings;