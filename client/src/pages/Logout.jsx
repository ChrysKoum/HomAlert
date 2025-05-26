import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';

const Logout = () => {
  const { clearUser } = useUser();
  
  useEffect(() => {
    // Clear user data from context and localStorage
    clearUser();
    
    // Redirect to the backend URL (likely the EJS app's home/login page)
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || '/';
    console.log(`Redirecting to ${backendUrl}...`);
    window.location.href = backendUrl;
  }, [clearUser]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-10 bg-white rounded shadow-md">
        <h1 className="text-xl font-semibold text-gray-700">Logging Out...</h1>
        <p className="text-gray-500 mt-2">Clearing session and redirecting.</p>
      </div>
    </div>
  );
};

export default Logout;