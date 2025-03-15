import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MeditationScene from './pages/MeditationScene';
import About from './pages/About';
import Contact from './pages/Contact';
import GrassPage from './pages/GrassPage';
import ModelPage from './pages/ModelPage'
import TreePage from './pages/TreePage'
import Navbar from './components/Navbar';
import './styles/App.css';
import ModelScene from './components/ModelScene';

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<MeditationScene />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/grass-page" element={< GrassPage/>} />
                <Route path="/model-scene" element={< ModelScene/>} />
                <Route path="/tree" element={< TreePage/>} />
            </Routes>
            <img className="controlKeys" src="/controls.png" alt="control keys" />
        </>
    );
};

export default App;
