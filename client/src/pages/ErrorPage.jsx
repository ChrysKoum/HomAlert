import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
       <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
       <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
       <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist or has been moved.</p>
       <Link
         to="/dashboard" // Link back to the main dashboard
         className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
       >
         Go to Dashboard
       </Link>
     </div>
  );
};

export default ErrorPage;