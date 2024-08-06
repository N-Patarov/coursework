import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import YouAreNotLoggedIn from "./YouAreNotLoggedIn";

export default function Profile(){
    const navigate = useNavigate(); // Use React Router's useHistory hook for navigation

    const[isLogged,setIsLogged] = useState(false);
    const [decodedToken, setDecodedToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);


    useEffect(() => {
        const getToken = async () => {
            try {
              const token = localStorage.getItem('token'); // Retrieve token from localStorage
              if (token && token.trim()) {
                const decoded = jwtDecode(token);
                setDecodedToken(decoded); // Set decoded token state
                setUserId(decoded.userId);
                setIsLogged(true)
                const userData = await axios.get("http://localhost:8000/api/search/user?userId=" + decoded.userId);
                setUserName(userData.data.username);
                setEmail(userData.data.email);
              }
            } catch (error) {
              console.error('Error decoding token:', error);
              setIsLogged(false)
            }
          };
          getToken();
       
    }, []);
    function handleLogout () {
        // Remove token from local storage
        localStorage.removeItem('token');
        setIsLogged(false)
        navigate("/");
    }
    function Greet(){
        if(isLogged){
            return(
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome, {userName}!</h1>
                    <div className="mt-4">
                        <p className="text-gray-600">Email: {email}</p>
                        <p className="text-gray-600">We're glad to have you back.</p>
                        <p className="text-gray-600">Feel free to explore and enjoy your personalized experience.</p>
                    </div>
                    <div className="mt-6">
                        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        
                        Edit Profile
                        </button>
                        <button className="ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                            onClick={handleLogout}
                        >
                        Logout
                        </button>
                    </div>
            </div>
            )
        }else{
            return(<YouAreNotLoggedIn />)
        }
    }
    console.log(userId);

    return(<Greet />);
}