import React, { useState } from 'react'; // Import useState
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import routes from './routes';
import './index.css'; // Ensure global styles are imported

const App = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // Lifted state

  return (
    <div className="flex min-h-screen bg-gray-100"> {/* Ensure background color */}
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded} // Pass state and setter
      />
      {/* Main Content Area with dynamic padding */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'pl-64' : 'pl-20' // Apply padding based on state
        }`}
      >
        {/* Routes will be rendered inside this padded area */}
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </div>
  );
};

export default App;
