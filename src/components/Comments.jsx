import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useAdmin } from '../AdminContext';

function Comments() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/articles/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded && decoded.userId) {
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    fetchComments();
    checkLoginStatus();
  }, [id]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/articles/${id}/comments`, { user, text: newComment });
      setComments(response.data);
      setNewComment('');
      setUser('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/articles/${id}/comments/${commentId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Comments</h2>
      <div className="mb-4">
        {comments.map((comment) => (
          <div key={comment._id} className="mb-2">
            <p className="text-sm text-gray-700"><strong>{comment.user}:</strong> {comment.text}</p>
            <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
            {isAdmin && (
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="ml-4 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      {isLoggedIn ? (
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="mb-2 p-2 border rounded"
          />
          <textarea
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-2 p-2 border rounded"
          />
          <button
            onClick={handleAddComment}
            className="self-start px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Add Comment
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">Please log in to add comments.</p>
      )}
    </div>
  );
}

export default Comments;
