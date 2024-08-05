import React from 'react';
import { Link } from 'react-router-dom';

function Card ({ title, thumbnail, description, id }) {
  return (
    <Link to={'article/' + id}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={thumbnail} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
        </div>
    </Link>
    
  );
};

export default Card;
