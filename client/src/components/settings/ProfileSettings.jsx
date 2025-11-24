import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEnvelope, FaPhone, FaHome, FaCog, FaPlus, FaPencilAlt, FaTrash, FaCheckCircle, FaExclamationCircle, FaSave, FaCamera } from 'react-icons/fa';
import Modal from '../common/Modal'; // Import the Modal component
import { useUser } from '../../context/UserContext';

// Mock data - replace with actual data fetching and state management from Firebase
const initialUserProfile = {
  uid: 'mockUserId123', // Add a UID for Firebase path
  name: 'Konstantinos',
  avatarUrl: null,
  emails: [
    { id: 'email1', address: 'konstantinos@mail.com', isPrimary: true, verified: true },
    { id: 'email2', address: 'personal@example.com', isPrimary: false, verified: false },
  ],
  phoneNumbers: [
    { id: 'phone1', number: '+357 99123456', isPrimary: true, verified: true },
  ],
  addresses: [
    { id: 'addr1', street: '8, KENNEDY AVE OFF. 101', city: 'Nicosia', state: 'Nicosia', country: 'Cyprus', isPrimary: true },
  ],
};

// Helper to generate unique IDs for new items (replace with Firebase push keys in real app)
const generateId = () => `temp_${Math.random().toString(36).substr(2, 9)}`;

// Reusable InfoCard and DetailItem (slightly modified DetailItem)
const InfoCard = ({ title, children, onAdd }) => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1 px-3 rounded-lg transition-colors"
        >
          <FaPlus className="mr-1.5 h-3 w-3" /> Add
        </button>
      )}
    </div>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const DetailItem = ({ icon: Icon, isPrimary, primaryText, secondaryText, onSettingsClick, item }) => (
  <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-shadow">
    <div className="flex items-center">
      <Icon className={`h-6 w-6 ${item?.verified === false ? 'text-orange-500' : 'text-blue-500'} mr-4 flex-shrink-0`} />
      <div>
        {isPrimary && (
          <span className="text-xs bg-gray-200 text-gray-600 font-semibold px-2 py-0.5 rounded-full inline-block mb-1">
            Primary
          </span>
        )}
        <p className="text-sm font-medium text-gray-800">{primaryText}</p>
        {secondaryText && <p className="text-xs text-gray-500">{secondaryText}</p>}
        {item?.verified === false && item?.address && ( // Show for unverified emails
            <p className="text-xs text-orange-600 mt-0.5">Not verified</p>
        )}
      </div>
    </div>
    <button onClick={() => onSettingsClick(item)} className="text-gray-400 hover:text-gray-600 p-1">
      <FaCog className="h-5 w-5" />
    </button>
  </div>
);


const ProfileSettings = () => {
  const { user, updateUser } = useUser();
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'addEmail', 'editEmail', 'addPhone', etc.
  const [currentItem, setCurrentItem] = useState(null); // For editing
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
    // Separate state for the main profile editing form
  const [profileForm, setProfileForm] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || '',
    phone: '',
    bio: ''
  });

  // Initialize profile form with user data when user context loads
  useEffect(() => {
    if (user) {
      setProfileForm({
        displayName: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        phone: '', // You might want to get this from user profile in Firebase
        bio: '' // You might want to get this from user profile in Firebase
      });
    }
  }, [user]);

  // --- Firebase Interaction Comments ---
  // useEffect(() => {
  //   // TODO: Fetch user profile from Firebase on component mount
  //   // const userId = firebase.auth().currentUser.uid;
  //   // firebase.database().ref(`users/${userId}/profile`).on('value', snapshot => {
  //   //   if (snapshot.val()) setUserProfile(snapshot.val());
  //   // });
  //   // return () => firebase.database().ref(`users/${userId}/profile`).off();
  // }, []);

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setCurrentItem(item);
    setFormData(item || {}); // Pre-fill form if editing
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setCurrentItem(null);
    setFormData({});
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Handler for the main profile form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  // Handler for photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File size limit: 5MB
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setMessage({ type: 'error', text: 'File size must be less than 5MB' });
      return;
    }

    // File type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setMessage({ type: 'error', text: 'Please upload a valid image file (JPG, PNG, GIF, or WebP)' });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Create a preview URL
      const previewURL = URL.createObjectURL(file);
      setProfileForm(prev => ({ ...prev, photoURL: previewURL }));
      
      // TODO: Upload to Firebase Storage
      // const storageRef = firebase.storage().ref(`profile-photos/${user.uid}/${file.name}`);
      // const snapshot = await storageRef.put(file);
      // const downloadURL = await snapshot.ref.getDownloadURL();
      // setProfileForm(prev => ({ ...prev, photoURL: downloadURL }));
      
      setMessage({ type: 'success', text: 'Photo uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading photo:', error);
      setMessage({ type: 'error', text: 'Failed to upload photo. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for the main profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Update user profile in Firebase
      // await updateUserProfile(user.uid, profileForm);
      
      // Update local user context
      updateUser({
        ...user,
        displayName: profileForm.displayName,
        photoURL: profileForm.photoURL
      });
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    // TODO: Add validation before submitting
    let updatedProfile = { ...userProfile };

    if (modalType === 'addEmail') {
      const newEmail = { id: generateId(), address: formData.address, isPrimary: !updatedProfile.emails.some(e => e.isPrimary), verified: false };
      updatedProfile.emails = [...updatedProfile.emails, newEmail];
      // TODO: Firebase: Add email to user's profile, potentially send verification.
      // firebase.database().ref(`users/${userProfile.uid}/profile/emails/${newEmail.id}`).set(newEmail);
      // firebase.auth().currentUser.sendEmailVerification(); // Or a custom flow
      console.log("TODO: Firebase - Add email and send verification", newEmail);
    } else if (modalType === 'editEmail' && currentItem) {
      updatedProfile.emails = updatedProfile.emails.map(email =>
        email.id === currentItem.id ? { ...email, ...formData } : email
      );
      if (formData.isPrimary) { // Ensure only one primary
        updatedProfile.emails = updatedProfile.emails.map(email =>
          email.id === currentItem.id ? email : { ...email, isPrimary: false }
        );
      }
      // TODO: Firebase: Update email in user's profile.
      // firebase.database().ref(`users/${userProfile.uid}/profile/emails/${currentItem.id}`).update(formData);
      console.log("TODO: Firebase - Update email", currentItem.id, formData);
    }
    // Add similar logic for phone and address
    // ...

    setUserProfile(updatedProfile);
    handleCloseModal();
  };

  const handleDeleteItem = (type, id) => {
    let updatedProfile = { ...userProfile };
    if (type === 'email') {
      // Prevent deleting the last primary email
      const emailToDelete = updatedProfile.emails.find(e => e.id === id);
      if (emailToDelete.isPrimary && updatedProfile.emails.filter(e => e.isPrimary).length <= 1) {
        alert("Cannot delete the only primary email address.");
        return;
      }
      updatedProfile.emails = updatedProfile.emails.filter(email => email.id !== id);
      // TODO: Firebase: Remove email from user's profile.
      // firebase.database().ref(`users/${userProfile.uid}/profile/emails/${id}`).remove();
      console.log("TODO: Firebase - Delete email", id);
    }
    // Add similar logic for phone and address
    // ...
    setUserProfile(updatedProfile);
    handleCloseModal(); // Close modal if delete was from within a modal
  };

  const handleSetPrimary = (type, id) => {
    let updatedProfile = { ...userProfile };
    if (type === 'email') {
      updatedProfile.emails = updatedProfile.emails.map(e => ({
        ...e,
        isPrimary: e.id === id
      }));
      // TODO: Firebase: Update primary status for all emails.
      // const updates = {};
      // updatedProfile.emails.forEach(e => updates[`users/${userProfile.uid}/profile/emails/${e.id}/isPrimary`] = e.isPrimary);
      // firebase.database().ref().update(updates);
      console.log("TODO: Firebase - Set primary email", id);
    }
    // Add similar logic for phone and address
    // ...
    setUserProfile(updatedProfile);
    if (modalType.startsWith('edit')) handleCloseModal();
  };

  const handleResendVerification = (emailAddress) => {
    // TODO: Firebase: Trigger resend verification email.
    // This typically involves using Firebase Admin SDK on the backend or a specific client-side flow if user is recently authenticated.
    // For client-side, if user is current user: firebase.auth().currentUser.sendEmailVerification();
    alert(`TODO: Resend verification for ${emailAddress}`);
    console.log("TODO: Firebase - Resend verification for", emailAddress);
  };


  // Placeholder functions for avatar and name change
  const handleChangeName = () => console.log('Change name clicked - TODO: Implement Modal');
  const handleEditAvatar = () => console.log('Edit avatar clicked - TODO: Implement File Upload');

  const renderModalContent = () => {
    if (modalType === 'addEmail' || modalType === 'editEmail') {
      return (
        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="address"
              id="address"
              value={formData.address || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          {modalType === 'editEmail' && currentItem && (
            <>
              <div className="flex items-center">
                <input
                  id="isPrimaryEmail"
                  name="isPrimary"
                  type="checkbox"
                  checked={formData.isPrimary || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isPrimaryEmail" className="ml-2 block text-sm text-gray-900">Set as primary</label>
              </div>
              {!currentItem.verified && (
                <button
                  onClick={() => handleResendVerification(currentItem.address)}
                  className="w-full text-sm text-blue-600 hover:text-blue-700"
                >
                  Resend Verification Email
                </button>
              )}
            </>
          )}
        </div>
      );
    }
    // TODO: Add modal content for Phone and Address
    return <p>Configure modal for {modalType}</p>;
  };

  const renderModalFooter = () => {
    if (modalType.startsWith('edit') && currentItem) {
      return (
        <>
          <button
            type="button"
            onClick={() => handleDeleteItem(modalType.replace('edit', '').toLowerCase(), currentItem.id)}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 hover:bg-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FaTrash className="inline mr-1" /> Delete
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </>
      );
    } else if (modalType.startsWith('add')) {
       return (
        <>
          <button
            type="button"
            onClick={handleCloseModal}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add
          </button>
        </>
      );
    }
    return null;
  };


  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 p-6">
              <h1 className="text-2xl font-semibold text-white">Profile Information</h1>
            </div>
            
            {message.text && (
              <div className={`p-4 mx-6 mt-4 rounded-md ${
                message.type === 'success' ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {message.text}
              </div>
            )}
            
            <div className="p-6 relative">
              <form onSubmit={handleProfileSubmit} className="space-y-6">                {/* Profile Photo */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600 flex items-center justify-center ring-4 ring-white shadow-lg">
                      {profileForm.photoURL ? (
                        <img src={profileForm.photoURL} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <FaUserCircle className="h-20 w-20 text-gray-400 dark:text-gray-500" />
                      )}
                    </div>
                    <label htmlFor="photoUpload" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-lg">
                      <FaCamera className="h-4 w-4" />
                      <input 
                        id="photoUpload" 
                        type="file" 
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden" 
                      />
                    </label>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Click the camera icon to upload
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Max 5MB • JPG, PNG, GIF, WebP
                    </p>
                  </div>
                </div>
                
                {/* Basic Info */}
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={profileForm.displayName}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleChange}
                    disabled={true}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-sm"
                    placeholder="you@example.com"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Contact administrator to change your email address.
                  </p>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="Your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={profileForm.bio}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="A short bio about yourself"
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="mr-2 -ml-1 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <InfoCard title="Emails" onAdd={() => handleOpenModal('addEmail')}>
            {userProfile.emails.map(email => (
              <DetailItem
                key={email.id}
                item={email}
                icon={FaEnvelope}
                isPrimary={email.isPrimary}
                primaryText={email.address}
                onSettingsClick={() => handleOpenModal('editEmail', email)}
              />
            ))}
          </InfoCard>

          <InfoCard title="Phone Numbers" onAdd={() => handleOpenModal('addPhone')}>
            {userProfile.phoneNumbers.map(phone => (
              <DetailItem
                key={phone.id}
                item={phone}
                icon={FaPhone}
                isPrimary={phone.isPrimary}
                primaryText={phone.number}
                // secondaryText={!phone.verified ? 'Not verified' : undefined}
                onSettingsClick={() => handleOpenModal('editPhone', phone)}
              />
            ))}
          </InfoCard>

          <InfoCard title="Addresses" onAdd={() => handleOpenModal('addAddress')}>
            {userProfile.addresses.map(address => (
              <DetailItem
                key={address.id}
                item={address}
                icon={FaHome}
                isPrimary={address.isPrimary}
                primaryText={`Street: ${address.street}`}
                secondaryText={`City: ${address.city}, State/province/area: ${address.state}`}
                onSettingsClick={() => handleOpenModal('editAddress', address)}
              />
            ))}
          </InfoCard>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          modalType.startsWith('add') ? `Add New ${modalType.replace('add', '')}` :
          modalType.startsWith('edit') ? `Edit ${modalType.replace('edit', '')}` : 'Settings'
        }
        footer={renderModalFooter()}
      >
        {renderModalContent()}      </Modal>
    </>
  );
};

export default ProfileSettings;