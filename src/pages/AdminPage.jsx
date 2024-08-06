import React from "react";
import Header from '../components/Header';
import ArticleForm from "../components/ArticleForm";
import { useNavigate } from 'react-router-dom';
import UserList from "../components/UserList";
import AdminDashBoard from "../components/AdminDashBoard";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import YouAreNotAdmin from "../components/YouAreNotAdmin";

export default function AdminPage(){
    const navigate = useNavigate(); 
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const getToken = async () => {
            try {
              const token = localStorage.getItem('token'); // Retrieve token from localStorage
              if (token && token.trim()) {
                const decoded = jwtDecode(token);
                setIsLogged(true);
                console.log(decoded)
                if(decoded.role == "admin"){setIsAdmin(true)}                
              }
            } catch (error) {
              console.error('Error decoding token:', error);
              setIsLogged(false)
            }
          };
          getToken();
       
    }, []);


    return(
        <>
            <Header />
            {isAdmin ? <AdminDashBoard /> : <YouAreNotAdmin />}
            
        </>
    );
}