import React, { useEffect, useRef, useState } from 'react';
import { FaMagic, FaArrowRight } from 'react-icons/fa';
import Swal from 'sweetalert2';

const filterClasses = {
  None: '',
  Vintage: 'sepia(1) brightness(1.1) contrast(0.9)',
  Soft: 'brightness(1.1) saturate(1.1)',
  Bw: 'grayscale(1)',
  Bright: 'brightness(1.25)',
};

const CameraScreen = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const clickSound = useRef(null);

  const [countdown, setCountdown] = useState(null);
  const [timerValue, setTimerValue] = useState(3);
  const [cameraMode, setCameraMode] = useState('user');
  const [selectedFilter, setSelectedFilter] = useState('None');
  const [showFilters, setShowFilters] = useState(false);
  const [fadeFilter, setFadeFilter] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);

  useEffect(() => {
    startCamera();
    clickSound.current = new Audio('/camera-click.mp3');
    return () => stopCamera();
  }, [cameraMode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraMode },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const startCountdown = () => {
    let seconds = timerValue;
    setCountdown(seconds);

    const interval = setInterval(() => {
      seconds--;
      if (seconds >= 0) {
        setCountdown(seconds);
      } else {
        clearInterval(interval);
        setCountdown(null);
        takePicture();
      }
    }, 1000);
  };

  const takePicture = () => {
    if (!videoRef.current) return;

    if (capturedPhotos.length >= 8) {
      Swal.fire({
        title: "Limit Reached!",
        text: "You can only capture up to 8 photos!",
        icon: "warning",
        confirmButtonColor: "#f472b6",
      });
      return;
    }

    clickSound.current.play();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (cameraMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.filter = filterClasses[selectedFilter] || 'none';
    ctx.drawImage(videoRef.current, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.filter = 'none';

    const imageDataUrl = canvas.toDataURL('image/png');
    setCapturedPhotos(prev => [...prev, imageDataUrl]);
  };

  const applyFilter = (filterName) => {
    setFadeFilter(true);
    setTimeout(() => {
      setSelectedFilter(filterName);
      setFadeFilter(false);
    }, 300);
  };

  const handleNext = () => {
    Swal.fire({
      title: "Next Page!",
      text: "Here you can navigate to editing/download page 🚀",
      icon: "info",
      confirmButtonColor: "#f472b6",
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-white flex flex-col items-center justify-center py-10 px-4">

      {/* Top Section */}
      <div className="relative flex items-start space-x-8">

        {/* Filter Button */}
        <div className="flex flex-col items-center relative">
          <button
            onClick={() => setShowFilters(prev => !prev)}
            className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shadow hover:bg-pink-400 mb-2"
          >
            <FaMagic />
          </button>

          {/* Filters */}
          {showFilters && (
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 p-4 bg-white/70 backdrop-blur-md rounded-lg shadow-lg">
              {Object.keys(filterClasses).map(filter => (
                <button
                  key={filter}
                  onClick={() => applyFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedFilter === filter
                      ? 'bg-pink-500 text-white'
                      : 'border border-pink-400 text-pink-500'
                  } hover:bg-pink-100`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Camera + Strip */}
        <div className="flex items-start space-x-6">

          {/* Camera */}
          <div className="relative w-[600px] h-[450px] rounded-xl overflow-hidden shadow-lg bg-black flex justify-center items-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transition-all duration-500 ${
                fadeFilter ? 'opacity-50' : 'opacity-100'
              } ${cameraMode === 'user' ? 'scale-x-[-1]' : ''}`}
              style={{ filter: filterClasses[selectedFilter] }}
            ></video>

            {/* Countdown */}
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-pink-400 flex items-center justify-center bg-white/70 text-3xl font-bold animate-pulse">
                  {countdown}
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden"></canvas>
          </div>

          {/* Captured Photos Strip */}
          <div className="grid grid-cols-2 gap-4 max-w-[300px]">
            {capturedPhotos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`capture-${idx}`}
                className="w-40 h-32 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>

          {/* Arrow to next */}
          {capturedPhotos.length > 0 && (
            <button
              onClick={handleNext}
              className="fixed right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-400 transition-all"
            >
              <FaArrowRight size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
        {/* Timer */}
        <div className="flex gap-2">
          {[3, 5, 10, 'None'].map(val => (
            <button
              key={val}
              onClick={() => setTimerValue(val === 'None' ? 0 : val)}
              className={`px-4 py-2 rounded-full text-sm ${
                (timerValue === val || (timerValue === 0 && val === 'None'))
                  ? 'bg-pink-500 text-white'
                  : 'border border-pink-400 text-pink-500'
              }`}
            >
              {val}s
            </button>
          ))}
        </div>

        {/* Camera Mode */}
        <select
          value={cameraMode}
          onChange={(e) => setCameraMode(e.target.value)}
          className="border border-pink-400 rounded-full py-2 px-4 text-sm text-pink-600"
        >
          <option value="user">Selfie</option>
          <option value="environment">Back</option>
        </select>
      </div>

      {/* Start Countdown */}
      <button
        onClick={startCountdown}
        className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition-all"
      >
        Start Countdown
      </button>

    </div>
  );
};

export default CameraScreen;
