import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import logo from '../assets/FH_Joanneum_Logo.png'; 
const Navbar = () => {
    return (
        
        <nav className="p-5 bg-gray-800 shadow-md flex justify-between items-center text-white ">
        <h1 className="text-3xl font-bold">🎮 Game Hub</h1>
        <div className="flex items-center">
            <img src={logo} alt="Meditation App Logo" className="h-12 w-12 md:h-16 md:w-16 mr-4" />
            <h1 className="text-xl font-semibold hidden md:block">Meditation App</h1>
        </div>

        {/* Centered navigation */}
        <div className="flex gap-6">
            <Link to="/" className="hover:text-gray-200 transition">Home</Link>
            <Link to="/meditation-scene" className="hover:text-gray-200 transition">Meditation</Link>
            <Link to="/about" className="hover:text-gray-200 transition">About</Link>
            <Link to="/contact" className="hover:text-gray-200 transition">Contact</Link>

            <Link to="/combini-page" className="hover:text-gray-200 transition">Combini game</Link>
            <Link to="/model-scene" className="hover:text-gray-200 transition">3D Model</Link>
           
        </div>
    </nav>
    );
};

export default Navbar;