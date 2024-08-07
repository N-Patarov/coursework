import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserList() {  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        setUsers(response.data);
      } catch (err) {
        setError('Error fetching users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError('Error deleting user');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">User List</h1>
    {loading && <p className="text-gray-500">Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
    {!loading && !error && (
      <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-6 text-left text-gray-600">ID</th>
              <th className="py-3 px-6 text-left text-gray-600">Username</th>
              <th className="py-3 px-6 text-left text-gray-600">Email</th>
              <th className="py-3 px-6 text-left text-gray-600">Role</th>
              <th className="py-3 px-6 text-left text-gray-600">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b">
                <td className="py-3 px-6 text-gray-700">{user._id}</td>
                <td className="py-3 px-6 text-gray-700">{user.username}</td>
                <td className="py-3 px-6 text-gray-700">{user.email}</td>
                <td className="py-3 px-6 text-gray-700">{user.role ? user.role : "user"}</td>
                <td>
                <button
                      onClick={() => deleteUser(user._id)}
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                    >
                      Delete
                </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  
  );
};


