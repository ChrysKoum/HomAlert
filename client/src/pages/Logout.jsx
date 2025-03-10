import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic here
    console.log('User logged out');
    window.location.href = import.meta.env.VITE_APP_BACKEND_URL; // Redirect to backend URL
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
