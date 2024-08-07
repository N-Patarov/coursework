import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function EditArticleForm() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [article , setArticle] = useState([])

  useEffect(()=>{
    const fetch = async ()=>{
        const response = await axios.get("http://localhost:8000/api/articles/"+id)
        setArticle(response.data)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setThumbnail(response.data.thumbnail)
        setArticleBody(response.data.articleBody)
    }
    fetch()

    },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, description, thumbnail, articleBody });

    const formData = {
        'title' : title,
        'description' : description,
        'thumbnail' : thumbnail,
        'articleBody' : articleBody 
    }
    
    try {
        const response = await axios.put('http://localhost:8000/api/articles/'+id, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(formData);

        console.log(response.data);
      } catch (error) {
        console.error('There was an error submitting the article!', error);
      }
      window.location.reload();
    };
    console.log(title)

  return (
    <div className="mt-8 max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description || ''}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="thumbnail">
            Thumbnail
          </label>
          <input
            type="text"
            id="thumbnail"
            value={thumbnail || ''}
            onChange={(e) => setThumbnail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="articleBody">
            Article Body
          </label>
          <textarea
            id="articleBody"
            value={articleBody|| ''}
            onChange={(e) => setArticleBody(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditArticleForm;
