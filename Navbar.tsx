import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, LogOut } from 'lucide-react';
import image from "./img.png";
import qr from "./qr.jpg";
import { X } from "lucide-react";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const [isVisible, setIsVisible] = useState(false);
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              {/* <Leaf className="h-8 w-8 text-green-600" /> */}
              <img className="h-8 w-8 text-green-600" src={image} alt="" />
              <span className="ml-2 text-xl font-bold text-gray-900">CibusPark</span>
            </Link>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">

<div className="flex flex-col items-center justify-center h-screen">
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-400 transition"
      >
        Donation
      </button>

      {/* Image Box - Only visible when isVisible is true */}
      {isVisible && (
        <div className="relative mt-5">
          <img
            src={qr} // Replace with your image URL
            alt="Square"
            className="w-40 h-40 border-2 border-gray-400 shadow-lg z-20 relative top-10 "
          />
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-40 relative top-3 left-0"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
          

                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}