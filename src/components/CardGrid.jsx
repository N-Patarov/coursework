import React from 'react';
import Card from './Card';

function CardGrid ({ articles }){
  return (
    <div className="mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">      {articles.map((article, index) => (
        <Card
          key={index}
          title={article.title}
          thumbnail={article.thumbnail}
          description={article.description}
        />
      ))}
    </div>
  );
};

export default CardGrid;
