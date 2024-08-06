import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function YouAreNotAdmin() {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">You Are Not Admin</h1>
      <p className="text-gray-600 mb-6">Please log in or register to your admin account to continue.</p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/admin/login')} // Navigate to login page
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/admin/register')} // Navigate to register page
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Register
        </button>
      </div>
    </div>
  );
}
