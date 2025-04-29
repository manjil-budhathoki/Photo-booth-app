import React from "react";
import { useNavigate } from "react-router-dom";
import { CameraIcon, PhotoIcon } from "@heroicons/react/24/solid"; // ✅ Tailwind HeroIcons

function ChooseSource() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-white overflow-hidden pt-32">

      {/* Pink Cloud Background */}
      <div className="absolute top-[-300px] left-1/2 transform -translate-x-1/2">
        <div className="w-[1600px] h-[1600px] bg-gradient-to-br from-pink-400 via-pink-200 to-transparent rounded-full opacity-50 blur-[300px] animate-pulse-slow"></div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-16 animate-fade-in">
        How would you like to proceed?
      </h2>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-8 z-10">
        
        {/* Camera Button */}
        <button
          onClick={() => navigate('/camera')}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-10 rounded-2xl shadow-lg hover:shadow-pink-400 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 animate-bounce-slow"
        >
          <CameraIcon className="h-6 w-6 text-white" /> CAMERA
        </button>

        {/* Upload Image Button */}
        <button
          onClick={() => navigate('/upload')}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-10 rounded-2xl shadow-lg hover:shadow-pink-400 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 animate-bounce-slow"
        >
          <PhotoIcon className="h-6 w-6 text-white" /> UPLOAD IMAGE
        </button>

      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
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
}

export default ChooseSource;
