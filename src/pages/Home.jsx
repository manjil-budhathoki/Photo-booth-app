import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // we use this to move to choose-frame

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-white overflow-hidden text-gray-900 pt-32">

      {/* Pink Cloud Background */}
      <div className="absolute top-[-200px] left-1/2 transform -translate-x-1/2">
        <div className="w-[1200px] h-[1200px] bg-gradient-to-br from-pink-400 via-pink-200 to-transparent rounded-full opacity-50 blur-[250px] animate-pulse-slow"></div>
      </div>

      {/* Main Caption */}
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 max-w-3xl leading-tight animate-fade-in">
        "Capture the magic of now — freeze it forever."
      </h1>

      <p className="text-md md:text-lg text-gray-600 mb-8 max-w-xl text-center animate-fade-in delay-200">
        Create stunning photo strips with just one click — fun, beautiful, timeless.
      </p>

      {/* Start Button */}
      <button 
        onClick={() => navigate('/frame-select')} // <-- this makes it go to /choose-frame
        className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white font-bold text-md shadow-lg hover:scale-105 transform transition-all duration-300 animate-bounce-slow"
      >
        START
      </button>

      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.05); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s infinite;
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2.5s infinite;
          }
        `}
      </style>

    </div>
  );
};

export default Home;
