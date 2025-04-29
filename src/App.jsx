import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FrameSelect from './pages/FrameSelect';
import ChooseSource from './pages/ChooseSource'; // NEW PAGE!!
import CameraScreen from './pages/CameraPage'; // NEW PAGE!!
import EditingPage from './pages/Editing'; // NEW PAGE!!


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/frame-select" element={<FrameSelect />} />
        <Route path="/choose-source" element={<ChooseSource />} />
        <Route path="/camera" element={<CameraScreen />} />
        <Route path="/editing" element={<EditingPage />} />
      </Routes>
    </>
  );
}

export default App;
