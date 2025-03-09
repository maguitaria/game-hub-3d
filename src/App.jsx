import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MeditationScene from './pages/MeditationScene';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import './styles/App.css';

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<MeditationScene />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </>
    );
};

export default App;
