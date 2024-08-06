import React from "react";
import UserList from "./UserList";
import { useNavigate } from 'react-router-dom';

export default function AdminDashBoard(){
    const navigate = useNavigate();

    return(
            <div className="flex flex-col items-center justify-center p-6">
                <div className="mb-4">
                <UserList />
                
                </div>
                <button
                    onClick={() => navigate('/admin/publish')} 
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                >
                    Publish Article
                </button>
            </div>
    )
}