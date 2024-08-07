import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../AdminContext';
import axios from 'axios';

function Card ({ title, thumbnail, description, id}) {
  const {isAdmin} = useAdmin();

  const deleteArticle = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/articles/${id}`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Link to={'article/' + id}>
          <img className="w-full" src={thumbnail} alt={title} />
          <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{title}</div>
              <p className="text-gray-700 text-base">{description}</p>
          </div>
      </Link>
      {isAdmin ? (
          <button
              className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              onClick={(e) => {
                  e.stopPropagation(); 
                  deleteArticle();
              }}
          >
              Delete
          </button>
      ) : null}
    </div>


    
  );
};

export default Card;
