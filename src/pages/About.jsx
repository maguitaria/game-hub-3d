import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/App.css';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-cyan-400 mb-6 animate-fade-in">
          🧠 About This Project
        </h1>

        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          <span className="font-semibold text-white">Game Hub</span> is a creative project built to enhance our skills with
          <span className="text-cyan-300"> Three.js</span>, real-time 3D rendering in the browser, and interactive APIs like
          <span className="text-yellow-300"> Google Maps</span>. It's a mix of fun experiments and technical challenges — a playground for learning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
          <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-cyan-500/40 transition duration-300">
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">🌍 Interactive 3D Maps</h2>
            <p>
              Navigate the world using Google Maps and collect points on a live map. Built with the Maps JavaScript API and integrated into a 3D world.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-purple-400/40 transition duration-300">
            <h2 className="text-xl font-semibold text-purple-300 mb-2">👻 Ghost Adventure</h2>
            <p>
              A playful 3D game where you control a ghost avatar and interact with the environment. Practice in player movement, physics, and animations.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-green-300/40 transition duration-300">
            <h2 className="text-xl font-semibold text-green-300 mb-2">🧘‍♂️ Meditation Scene</h2>
            <p>
              A relaxing virtual space designed with ambient sounds and a calm visual style — a reminder that coding can be mindful too.
            </p>
          </div>
        </div>

        <div className="mt-16 text-gray-400">
          <p className="text-sm">
            🎓 This project was created as a student experiment to explore the capabilities of <strong>React Three Fiber</strong>, <strong>Drei</strong>, and real-world API integration.
          </p>
          <p className="text-sm mt-1">
            Tools used: <span className="text-gray-300">React, React Bits, Three.js, Vite, Tailwind CSS, Google Maps API</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
