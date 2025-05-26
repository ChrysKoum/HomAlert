import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNavBar from './components/TopNavBar';
import routes from './routes';
import { UserProvider } from './context/UserContext'; // Import the UserProvider
import './index.css';

const App = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      return savedMode === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  return (
    <UserProvider> {/* Wrap the app with UserProvider */}
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        {!location.pathname.startsWith('/auth/logout') && (
          <>
            <Sidebar
              isExpanded={isSidebarExpanded}
              setIsExpanded={setIsSidebarExpanded}
            />
            <main
              className={`flex-1 transition-all duration-300 ease-out ${
                isSidebarExpanded ? 'pl-64' : 'pl-20'
              } flex flex-col`}
            >
              <TopNavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              <div className="flex-grow p-4 md:p-6 overflow-y-auto">
                <Routes>
                  {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                  ))}
                </Routes>
              </div>
            </main>
          </>
        )}
        {location.pathname.startsWith('/auth/logout') && (
          <Routes>
            {routes.filter(r => r.path.startsWith('/auth/logout')).map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        )}
      </div>
    </UserProvider>
  );
};

export default App;