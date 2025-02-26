import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import routes from './routes';

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
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
