import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNavBar from './components/TopNavBar'; // Import TopNavBar
import routes from './routes';
import './index.css';
// import axios from 'axios'; // Uncomment if you fetch user data here

const App = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [userName, setUserName] = useState('User'); // Add state for userName

  // Optional: Fetch user data once when App mounts
  // useEffect(() => {
  //   axios.get('/api/user-profile') // Example endpoint
  //     .then(response => {
  //       setUserName(response.data.name || 'User');
  //     })
  //     .catch(error => {
  //       console.error("Error fetching user data:", error);
  //       // Handle error, maybe redirect to login if unauthorized
  //     });
  // }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <main
        className={`flex-1 transition-all duration-300 ease-out ${ // Changed ease-in-out to ease-out
          isSidebarExpanded ? 'pl-64' : 'pl-20'
        }`}
      >
        {/* Render TopNavBar here, it will persist across routes */}
        <TopNavBar userName={userName} />
        
        {/* Routes will be rendered inside this padded area, below TopNavBar */}
        {/* Add padding to the content area of routes if TopNavBar is fixed, or adjust layout */}
        <div className="p-4 md:p-6"> {/* Wrapper for page content with padding */}
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
