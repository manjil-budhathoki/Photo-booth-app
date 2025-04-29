import React from 'react';
import { useLocation } from 'react-router-dom';

function EditingPage() {
  const location = useLocation();
  const { capturedPhotos = [], selectedFrameId } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-10">

      <h1 className="text-2xl font-bold mb-6">Adjust Your Photos</h1>

      <div className="flex space-x-8">

        {/* Frame Section */}
        <div className="w-80 h-[500px] bg-pink-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Frame (ID: {selectedFrameId})</p>
        </div>

        {/* Captured Photos Section */}
        <div className="flex flex-col items-center">
          <div className="w-[300px] h-[300px] border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
            {capturedPhotos.length > 0 ? (
              <img src={capturedPhotos[0]} alt="Selected" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <p className="text-gray-500">No photo selected</p>
            )}
          </div>
          <button
            className="mt-6 px-6 py-2 bg-pink-400 text-white rounded-full hover:bg-pink-300"
          >
            Okay
          </button>
        </div>

      </div>

    </div>
  );
}

export default EditingPage;
