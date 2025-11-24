import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = () => {
      try {
        // Try to get user data from localStorage
        const storedUser = localStorage.getItem('homalert_user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('homalert_user', JSON.stringify(userData));
    }
  };

  // Function to clear user data on logout
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('homalert_user');
    localStorage.removeItem('authToken');
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing the user context
export const useUser = () => useContext(UserContext);