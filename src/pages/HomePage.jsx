import React from 'react';
import Header from '../components/Header'
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useAdmin } from '../AdminContext';

function HomePage() {
    const [articles, setArticles] = useState([]);
    const {isAdmin, setIsAdmin} = useAdmin();

    useEffect(()=>{
        const fetch = async () =>{
            const response = await axios.get("http://localhost:8000/api/articles/")
            setArticles(response.data)
        }
        const getToken = async () => {
          try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            if (token) {
              const decoded = jwtDecode(token);
              setIsAdmin(decoded.role === 'admin');
                             
            }else{setIsAdmin(false)}
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        };
        fetch()
        getToken()
    },[setIsAdmin])

    useEffect(() => {
      console.log('isAdmin:', isAdmin);
    }, [isAdmin]);
  return (
    <>
      <Header />          
      <CardGrid articles={articles} />    
    </>
    
  );
}

export default HomePage;
