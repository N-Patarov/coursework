// AdminContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from 'jwt-decode';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.role === 'admin');
    }
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
