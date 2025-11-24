import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNavBar from './components/TopNavBar';
import routes from './routes';
import { UserProvider } from './context/UserContext';
import './index.css';

const App = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      return savedMode === 'true';
    }
    // Default to light mode (false) if no preference is saved
    return false; 
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
              isDarkMode={isDarkMode}
            />
            
            {/* Mobile Overlay */}
            {isSidebarExpanded && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                onClick={() => setIsSidebarExpanded(false)}
              />
            )}

            <main
              className={`flex-1 transition-all duration-300 ease-out ${
                isSidebarExpanded ? 'md:pl-64' : 'md:pl-20'
              } flex flex-col w-full`}
            >
              <TopNavBar 
                isDarkMode={isDarkMode} 
                setIsDarkMode={setIsDarkMode} 
                toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
              />
              <div className="flex-grow p-4 md:p-6 overflow-y-auto overflow-x-hidden">
                <Routes>
                  {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                  ))}
                </Routes>
                <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
                  <p>This is a university project. All data displayed is for educational purposes only.</p>
                </footer>
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