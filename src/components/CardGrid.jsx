import React from 'react';
import Card from './Card';
import { useState, useEffect } from 'react';
import { useAdmin } from '../AdminContext.jsx';

function CardGrid ({ articles}){
  const {isAdmin} = useAdmin();

 
  return (
    <div className="mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">      
    {articles.map((article, index) => (
        <Card   
          key={index}
          id={article._id}
          title={article.title}
          thumbnail={article.thumbnail}
          description={article.description}
        />
      ))}
      {isAdmin ? <h2>You are admin</h2> : <h2>You are not admin</h2>}
    </div>
  );
};

export default CardGrid;
