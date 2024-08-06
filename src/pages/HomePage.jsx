import React from 'react';
import Header from '../components/Header'
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import axios from 'axios';
import { useEffect, useState } from 'react';

function HomePage() {
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        const fetch = async ()=>{
            const response = await axios.get("http://localhost:8000/api/articles/")
            setArticles(response.data)
        }
        fetch()

    },[])
  return (
    <>
      <Header />          
      <CardGrid articles={articles}/>
    </>
    
  );
}

export default HomePage;
