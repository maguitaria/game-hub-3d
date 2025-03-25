import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center flex-grow text-center px-6">
                <h2 className="text-5xl font-extrabold mb-4">Welcome to Game Hub!</h2>
                <p className="text-lg text-gray-300 mb-6">Choose your adventure and start exploring different worlds.</p>
                <div className="flex space-x-6">
                    <Link to="/model-scene" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg text-lg font-semibold transition">
                        Play 3D Game
                    </Link>
                    <Link to="/maps-game" className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg text-lg font-semibold transition">
                        Play Google Maps Game
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="p-4 bg-gray-800 text-center text-gray-400">
                <p>&copy; 2025 Game Hub. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
