import React from 'react';
import Navbar from '../components/Navbar';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white">
  

      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 text-center mb-8">
          ✉️ Contact Us
        </h1>

        <p className="text-center text-gray-300 mb-10">
          Got feedback, ideas, or just want to say hello? Drop us a message below!
        </p>

        <form
          className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-lg"
          onSubmit={(e) => {
            e.preventDefault()
            alert('Thanks for reaching out! 🚀')
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Your Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
            <textarea
              rows="5"
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-center text-sm text-gray-400">
          Or reach us at: <br />
          📧 <a href="mailto:mglushen22@students.oamk.fi" className="text-cyan-400 hover:underline">mglushen22@students.oamk.fi</a><br />
          🧑‍💻 <a href="https://github.com/maguitaria/game-hub-3d" className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
