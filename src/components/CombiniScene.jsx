import { Canvas, useFrame } from "@react-three/fiber";
import { Gltf, KeyboardControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
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
    const [lastPlayerPosition, setLastPlayerPosition] = useState({ ...playerRef.current });
    const [currentCity, setCurrentCity] = useState(null);
const [cityQuest, setCityQuest] = useState(null);
const [starsCollected, setStarsCollected] = useState(0);
const [regenCooldown, setRegenCooldown] = useState(false); // Cooldown state

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
                    checkCityQuest()
                }
            });
        });
    }, [gameStarted, startLocation]);
    const generatePoints = (mapInstance) => {
      if (!mapInstance) return; // Ensure the map is ready
  
      // Generate 5 stars within a reasonable distance from the player
      const newPoints = Array.from({ length: 5 }, () => ({
          lat: playerRef.current.lat + (Math.random() - 0.002) * 0.004, // Smaller range for visibility
          lng: playerRef.current.lng + (Math.random() - 0.002) * 0.004,
      }));
  
      setPoints(newPoints);
  
      // Remove previous markers
      pointMarkers.current.forEach(marker => marker.setMap(null));
      pointMarkers.current = [];
  
      // Add new markers (icons) to map
      newPoints.forEach((point) => {
          const marker = new google.maps.Marker({
              position: point,
              map: mapInstance,
              icon: {
                  url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Star_icon_stylized.svg", // ✅ High-resolution star
                  scaledSize: new google.maps.Size(80, 80), // ✅ Ensures stars are visible
                  anchor: new google.maps.Point(25, 25), // ✅ Center the icon
              },
          });
          pointMarkers.current.push(marker);
      });
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

  const getCityName = async (lat, lng) => {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`);
        const data = await response.json();
        if (data.results.length > 0) {
            const city = data.results.find(result => result.types.includes("locality"));
            return city ? city.formatted_address : "Unknown City";
        }
    } catch (error) {
        console.error("Error fetching city:", error);
        return "Unknown City";
    }
};

const checkCityQuest = async () => {
    const cityName = await getCityName(playerRef.current.lat, playerRef.current.lng);
    
    if (cityName !== currentCity) {
        setCurrentCity(cityName);
        setCityQuest({
            name: `Explore ${cityName}!`,
            goal: 5,
            progress: 0,
        });
        setStarsCollected(0);
        setNotification(`📍 Welcome to ${cityName}! New Quest: Collect 5 stars!`);
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

    // ✅ Only regenerate stars if player moves more than 0.01 in lat/lng (large city block)
    const distance = Math.sqrt(
        (playerRef.current.lat - lastPlayerPosition.lat) ** 2 +
        (playerRef.current.lng - lastPlayerPosition.lng) ** 2
    );

    if (distance > 0.01 && !regenCooldown) { // Prevents frequent regen
        setRegenCooldown(true);
        setTimeout(() => setRegenCooldown(false), 5000); // Cooldown: 5 seconds before regen again

        setLastPlayerPosition({ ...playerRef.current });
        generatePoints(map);
    }
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
                  setStarsCollected((prev) => prev + 1);
                  setNotification("🎉 Star Collected!");
  
                  // ✅ Update Quest Progress
                  if (cityQuest && starsCollected + 1 >= cityQuest.goal) {
                      setNotification(`✅ Quest Completed: ${cityQuest.name}!`);
                      setCityQuest(null); // Remove the quest
                  }
  
                  setTimeout(() => setNotification(""), 1500);
  
                  // Remove marker from map
                  if (pointMarkers.current[index]) {
                      pointMarkers.current[index].setMap(null);
                      pointMarkers.current.splice(index, 1);
                  }
                  return false;
              }
              return true;
          })
      );
  };
  
 return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-gradient-to-br from-blue-900 to-black text-white">
        {!gameStarted ? (
            <div className="absolute w-full h-full flex flex-col items-center justify-center text-white">
                <h1 className="text-5xl font-bold mb-5">🌍 Welcome to the Exploration Game!</h1>

                <p className="text-lg mb-4 text-gray-300">Travel to real-world cities and collect stars!</p>

                <div className="flex space-x-5">
                    {Object.keys(players).map((key) => (
                        <button
                            key={key}
                            className={`p-3 rounded transition shadow-lg ${
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
                    <p className="mt-3 text-lg bg-gray-700 p-2 rounded">🌤 Weather: {weather}</p>
                )}

                <button
                    className={`p-3 mt-5 rounded shadow-md ${
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
                {/* ✅ Score & Quest Progress UI */}
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 p-3 bg-blue-600 text-white rounded shadow-md text-xl font-bold z-10">
                    Score: {score} ⭐
               
  

                {notification && (
                    <p className="absolute top-1/4 left-1/2 transform -translate-x-1/2 p-3 bg-yellow-500 text-black rounded shadow-md text-lg font-bold z-10">
                        {notification}
                    </p>
                )}

                {/* ✅ Welcome Banner for City */}
                {currentCity && (
                    <p className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-3xl font-bold p-5 rounded-b-md shadow-lg">
                        📍 {currentCity}
                    </p>
                )}
 </div>
                {/* ✅ Google Map */}
                <div ref={mapContainerRef} id="map" className="absolute w-full h-full top-0 left-0"></div>

                {/* ✅ Game Canvas */}
                <Canvas shadows className="w-full h-full">
                    <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
              <directionalLight intensity={0.7} castShadow position={[-10, 20, 10]} />
              <pointLight position={[10, 10, 10]} intensity={1} />

                        <Physics timeStep="vary">
                            <KeyboardControls map={keyboardMap} onChange={movePlayer}>
                                <Controller maxVelLimit={5}>
                                <RigidBody type="fixed" colliders="trimesh">
                                    <Gltf
                                        position={[0, jumpRef.current ? 1 : 0, 0]}
                                        castShadow
                                        receiveShadow
                                        scale={0.315}
                                        src={selectedPlayer}
                                    />
                                    </RigidBody>
                                </Controller>
                            </KeyboardControls>
                        </Physics>
                    </Suspense>
                </Canvas>

             {/* 🔹 Control Keys Overlay Image - Always Visible */}
      <img
        src="/controls.png"
        alt="Control Keys"
        className="absolute bottom-4 left-4 w-40 opacity-80 pointer-events-none"
      />
            </>
        )}
    </div>
);
};

export default Game;
