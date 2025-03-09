import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const Navbar = () => {
    return (
        <nav className="w-full bg-gradient-to-r from-green-400 to-blue-500 p-4 shadow-md text-white text-lg flex flex-wrap items-center justify-between md:justify-center gap-4 md:gap-6">
            <div className="text-xl font-semibold md:hidden">Meditation App</div>
            <div className="flex flex-col md:flex-row md:gap-6 text-center w-full md:w-auto">
                <Link to="/" className="hover:text-gray-200 transition px-3 py-2">Home</Link>
                <Link to="/about" className="hover:text-gray-200 transition px-3 py-2">About</Link>
                <Link to="/contact" className="hover:text-gray-200 transition px-3 py-2">Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;