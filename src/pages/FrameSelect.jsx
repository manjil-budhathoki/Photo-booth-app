import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // 🆕 import
import frame1 from '../assets/frame1.png';
import frame2 from '../assets/frame2.png';
import frame3 from '../assets/frame3.png';
import frame4 from '../assets/frame4.png';
import frame5 from '../assets/frame5.png';
import frame6 from '../assets/frame6.png';

const frames = [
  { id: 1, src: frame1 },
  { id: 2, src: frame2 },
  { id: 3, src: frame3 },
  { id: 4, src: frame4 },
  { id: 5, src: frame5 },
  { id: 6, src: frame6 },
];

function FrameSelect() {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const navigate = useNavigate(); // 🆕 create navigate object

  const handleFrameClick = (frameId) => {
    setSelectedFrame(frameId);
    console.log("Selected Frame:", frameId);
    navigate('/choose-source');  // 🆕 go to choose source page
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-white overflow-hidden pt-32">

      {/* Pink Cloud Background */}
      <div className="absolute top-[-300px] left-1/2 transform -translate-x-1/2">
        <div className="w-[1600px] h-[1600px] bg-gradient-to-br from-pink-400 via-pink-200 to-transparent rounded-full opacity-50 blur-[300px] animate-pulse-slow"></div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-16 animate-fade-in">
        Choose Your Frame
      </h2>

      {/* Frame Grid */}
      <div className="grid grid-cols-3 gap-x-24 gap-y-20 z-10">
        {frames.map((frame) => (
          <img
            key={frame.id}
            src={frame.src}
            alt={`Frame ${frame.id}`}
            onClick={() => handleFrameClick(frame.id)}
            className="w-28 h-48 object-contain cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-rotate-3 animate-fade-in"
          />
        ))}
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
        `}
      </style>
    </div>
  );
}

export default FrameSelect;
