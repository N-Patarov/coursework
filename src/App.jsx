import React from 'react';
import Header from './components/Header'
import ArticleForm from './components/ArticleForm';
import Card from './components/Card';
import CardGrid from './components/CardGrid';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Article from './components/Article';
import ArticlePage from './pages/ArticlePage'
import Profile from './components/Profile';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import WriteArticlePage from './pages/WriteArticlePage';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  
  return (
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/publish" element={<WriteArticlePage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/article/:id" element={<ArticlePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
