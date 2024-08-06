import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export default function Profile(){
    const navigate = useNavigate(); // Use React Router's useHistory hook for navigation

    const[isLoged,setIsLoged] = useState(false);
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
                setIsLoged(true)
                const userData = await axios.get("http://localhost:8000/api/search/user?userId=" + decoded.userId);
                setUserName(userData.data.username);
                setEmail(userData.data.email);
              }
            } catch (error) {
              console.error('Error decoding token:', error);
              setIsLoged(false)
            }
          };
          getToken();
       
    }, []);
    function handleLogout () {
        // Remove token from local storage
        localStorage.removeItem('token');
        setIsLoged(false)
        navigate("/");
    }
    function Greet(){
        if(isLoged){
            return(
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome, {userName}!</h1>
                    <div className="mt-4">
                        <p class="text-gray-600">Email: {email}</p>
                        <p class="text-gray-600">We're glad to have you back.</p>
                        <p class="text-gray-600">Feel free to explore and enjoy your personalized experience.</p>
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
            return(<h1>You are not logged in!</h1>)
        }
    }
    console.log(userId);

    return(<Greet />);
}