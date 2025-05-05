import React, { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    // 1. Clear authentication token (adjust 'authToken' if your key is different)
    localStorage.removeItem('authToken');
    console.log('Auth token removed.');

    // 2. Redirect to the backend URL (likely the EJS app's home/login page)
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || '/'; // Fallback URL
    console.log(`Redirecting to ${backendUrl}...`);
    window.location.href = backendUrl;

    // No cleanup needed as the page will navigate away
  }, []);

  // Provide feedback while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-10 bg-white rounded shadow-md">
        <h1 className="text-xl font-semibold text-gray-700">Logging Out...</h1>
        <p className="text-gray-500 mt-2">Clearing session and redirecting.</p>
        {/* Optional: Add a spinner */}
      </div>
    </div>
  );
};

export default Logout;
