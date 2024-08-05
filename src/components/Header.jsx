// src/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          My News App
        </div>
        <nav>
          <ul className="flex space-x-4">
            <Link to='/'>
                Home
            </Link>
            <Link to='/profile'>
                Profile
            </Link>
            <Link to='/admin'>
                Admin
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
