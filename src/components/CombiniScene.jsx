import { Canvas, useFrame } from "@react-three/fiber";
import { Gltf, KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useState, useEffect, useRef } from "react";
import { Suspense } from "react";
import Controller from "ecctrl";
import { Loader } from "@googlemaps/js-api-loader";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const WEATHER_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your OpenWeather API key

const players = {
    ghost: { name: "Ghost", model: "/ghost_w_tophat-transformed.glb" },
    robot: { name: "Robot", model: "/chicken_little_baseball_player_shirt.glb" },
};

// ✅ Star icon for points
const POINT_ICON_URL = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Star-icon.svg";

const Game = () => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [startLocation, setStartLocation] = useState("");
    const [gameStarted, setGameStarted] = useState(false);
    const [weather, setWeather] = useState(null);
    const [score, setScore] = useState(0);
    const [notification, setNotification] = useState("");
    const [map, setMap] = useState(null);
    const playerRef = useRef({ lat: 50.4501, lng: 30.5234 });
    const jumpRef = useRef(false);
    const mapContainerRef = useRef(null); // ✅ Ensures `#map` is available
    const pointMarkers = useRef([]);
    const [points, setPoints] = useState([]);
    const keyboardMap = [
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
    ];

    // ✅ Initialize Google Maps AFTER component mounts & game starts
    useEffect(() => {
        if (!gameStarted || !startLocation || !mapContainerRef.current) return;

        const loader = new Loader({ apiKey: API_KEY, version: "beta" });
        loader.load().then(() => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: startLocation }, (results, status) => {
                if (status === "OK" && results[0]) {
                    const newLocation = results[0].geometry.location;
                    playerRef.current = { lat: newLocation.lat(), lng: newLocation.lng() };

                    const newMap = new google.maps.Map(mapContainerRef.current, {
                        center: playerRef.current,
                        zoom: 18,
                        disableDefaultUI: true,
                    });

                    setMap(newMap);
                    generatePoints(newMap);
                    fetchWeather(newLocation.lat(), newLocation.lng()); // ✅ Fetch live weather
                }
            });
        });
    }, [gameStarted, startLocation]);
    const generatePoints = (mapInstance) => {
      const newPoints = Array.from({ length: 5 }, () => ({
          lat: playerRef.current.lat + (Math.random() - 0.5) * 0.01,
          lng: playerRef.current.lng + (Math.random() - 0.5) * 0.01,
      }));

      setPoints(newPoints);

      // Add markers (icons) to map
      pointMarkers.current = newPoints.map((point) =>
          new google.maps.Marker({
              position: point,
              map: mapInstance,
              icon: {
                  url: POINT_ICON_URL,
                  scaledSize: new google.maps.Size(100, 100),
              },
          })
      );
  };
     // ✅ Fetch real-time weather from Open-Meteo API
     const fetchWeather = async (lat, lon) => {
      try {
          const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`
          );
          const data = await response.json();
          const currentTemp = data.hourly.temperature_2m[0]; // Get first available temperature
          setWeather(`${currentTemp}°C`);
      } catch (error) {
          console.error("Failed to fetch weather data", error);
      }
  };

    const movePlayer = (direction) => {
        let delta = 0.0005;
        if (direction === "forward") playerRef.current.lat += delta;
        if (direction === "backward") playerRef.current.lat -= delta;
        if (direction === "leftward") playerRef.current.lng -= delta;
        if (direction === "rightward") playerRef.current.lng += delta;

        if (map) {
            map.setCenter(playerRef.current);
        }
        checkCollision();
    };

    const handleJump = () => {
        if (!jumpRef.current) {
            jumpRef.current = true;
            setTimeout(() => {
                jumpRef.current = false;
            }, 500);
        }
    };

    const checkCollision = () => {
      setPoints((prevPoints) =>
          prevPoints.filter((point, index) => {
              const distance = Math.sqrt(
                  (point.lat - playerRef.current.lat) ** 2 +
                      (point.lng - playerRef.current.lng) ** 2
              );
              if (distance < 0.0005) {
                setScore((prevScore) => prevScore + 1);
                setNotification("🎉 Star Collected!");
                setTimeout(() => setNotification(""), 1500);

                  // Remove marker from map
                  pointMarkers.current[index].setMap(null);
                  return false;
              }
              return true;
          })
      );
  };
    return (
        <div className="w-screen h-screen fixed top-0 left-0">
            {!gameStarted ? (
                <div className="absolute w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white">
                    <h1 className="text-3xl mb-5">Select Your Character</h1>

                    <div className="flex space-x-5">
                        {Object.keys(players).map((key) => (
                            <button
                                key={key}
                                className={`p-3 rounded transition ${
                                    selectedPlayer === players[key].model
                                        ? "bg-yellow-500"
                                        : "bg-gray-700 hover:bg-gray-600"
                                }`}
                                onClick={() => setSelectedPlayer(players[key].model)}
                            >
                                {players[key].name}
                            </button>
                        ))}
                    </div>

                    <input
                        type="text"
                        placeholder="Enter a city or country"
                        className="p-2 mt-5 text-white rounded"
                        value={startLocation}
                        onChange={(e) => setStartLocation(e.target.value)}
                    />

                    {weather && (
                        <p className="mt-3 text-lg bg-gray-700 p-2 rounded">
                            🌤 Weather: {weather}
                        </p>
                    )}

                    <button
                        className={`p-3 mt-5 rounded ${
                            selectedPlayer && startLocation
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-gray-500 cursor-not-allowed"
                        }`}
                        onClick={() => selectedPlayer && startLocation && setGameStarted(true)}
                        disabled={!selectedPlayer || startLocation === ""}
                    >
                        Start Game
                    </button>
                </div>
            ) : (
                <>
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 p-3 bg-blue-600 text-white rounded shadow-md text-xl font-bold z-10 animate-bounce">
                        Score: {score}
                    </div>

                    {notification && (
                        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 p-3 bg-green-500 text-white rounded shadow-md text-lg font-bold z-10">
                            {notification}
                        </div>
                    )}

                    {/* ✅ This ensures the map is available before initialization */}
                    <div ref={mapContainerRef} id="map" className="absolute w-full h-full top-0 left-0"></div>

                    <Canvas shadows className="w-full h-full">
                        <Suspense fallback={null}>
                            <Physics timeStep="vary">
                                <KeyboardControls map={keyboardMap} onChange={movePlayer}>
                                    <Controller maxVelLimit={5}>
                                        <Gltf
                                            position={[0, jumpRef.current ? 1 : 0, 0]}
                                            castShadow
                                            receiveShadow
                                            scale={0.315}
                                            src={selectedPlayer}
                                        />
                                    </Controller>
                                </KeyboardControls>
                            </Physics>
                        </Suspense>
                    </Canvas>

                    <button
                        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 p-3 bg-yellow-500 text-black rounded shadow-md"
                        onClick={handleJump}
                    >
                        Jump
                    </button>
                </>
            )}
        </div>
    );
};

export default Game;
