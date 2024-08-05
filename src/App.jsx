import React from 'react';
import Header from './components/Header'
import ArticleForm from './components/ArticleForm';
import Card from './components/Card';
import CardGrid from './components/CardGrid';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Article from './components/Article';
import ArticlePage from './pages/ArticlePage'

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  
  return (
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/article/:id" element={<ArticlePage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
