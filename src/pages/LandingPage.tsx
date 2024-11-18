import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();

  const handleGetStarted = useCallback(() => {
    navigate("/login");
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to Event Manager</h1>
      <p className="text-lg mb-8">Start managing and creating your events seamlessly.</p>
      
      <button
        onClick={handleGetStarted}
        className="bg-yellow-500 text-black py-3 px-8 rounded-lg text-xl font-semibold hover:bg-yellow-400 transition-colors"
      >
        Get Started
      </button>
      
      <div id="get-started" className="mt-16 text-center">
        <p className="text-xl text-gray-200">Ready to take control of your schedule?</p>
        <p className="text-sm mt-2 text-gray-100">
          Easily create, manage, and track your events, all in one place.
        </p>
      </div>
    </div>
  );
};

