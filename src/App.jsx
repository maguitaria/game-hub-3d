import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MeditationScene from './pages/MeditationScene';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import './styles/App.css';
import ModelScene from './components/ModelScene';
import Game from './components/CombiniScene';
import LandingPage from './pages/Home';
const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
            
      
                <Route path="/" element={<LandingPage />} />
                <Route path="/meditation-scene" element={<MeditationScene />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/explore-game" element={< Game/>} />
                <Route path="/ghost-adventure" element={< ModelScene/>} />
            </Routes>
       </>
    );
};

export default App;
