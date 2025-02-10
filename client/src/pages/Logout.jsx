import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic here
    console.log('User logged out');
    navigate('/auth/login'); // Redirect to login page
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
