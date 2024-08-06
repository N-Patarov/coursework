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
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b">
                <td className="py-3 px-6 text-gray-700">{user._id}</td>
                <td className="py-3 px-6 text-gray-700">{user.username}</td>
                <td className="py-3 px-6 text-gray-700">{user.email}</td>
                <td className="py-3 px-6 text-gray-700">{user.role ? user.role : "user"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  
  );
};


