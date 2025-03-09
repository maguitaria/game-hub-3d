import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/App.css';

const About = () => {
    return (
        <div>
            <Navbar />
            <div className="content-container">
                <h1>About This Meditation App</h1>
                <p>This app provides a calming 3D environment for meditation and relaxation.</p>
                <p>Experience different meditation modes and enjoy the peaceful nature sounds.</p>
            </div>
        </div>
    );
};

export default About;
