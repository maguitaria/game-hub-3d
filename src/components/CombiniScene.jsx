
import { Canvas } from "@react-three/fiber";
import { Gltf, KeyboardControls, } from "@react-three/drei";
import { Loader } from "@googlemaps/js-api-loader";
import { Physics, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useState, useMemo, useEffect, useRef } from "react";
import { Suspense } from "react";
import { useFrame } from "@react-three/fiber";
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// da2c86e64aa8a82f
import Controller from "ecctrl";

const players = {
  ghost: "/ghost_w_tophat-transformed.glb",
  robot: "/chicken_little_baseball_player_shirt.glb",
};

const UkraineWalk = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(players.ghost);
  const [map, setMap] = useState(null);
  const [points, setPoints] = useState([]);
  const [score, setScore] = useState(0);
  const playerRef = useRef({ lat: 50.4501, lng: 30.5234 });

  const keyboardMap = useMemo(
    () => [
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
      { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    ],
    []
  );

  useEffect(() => {
    const initGoogleMaps = async () => {
      const loader = new Loader({ apiKey: API_KEY, version: "beta" });
      await loader.load();

      const newMap = new google.maps.Map(document.getElementById("map"), {
        center: playerRef.current,
        zoom: 18,
        mapId: "da2c86e64aa8a82f",
        disableDefaultUI: true,
      });
      setMap(newMap);
      generatePoints(newMap);
    };

    const generatePoints = (mapInstance) => {
      const newPoints = Array.from({ length: 5 }, () => ({
        lat: 50.45 + (Math.random() - 0.5) * 0.01,
        lng: 30.5234 + (Math.random() - 0.5) * 0.01,
      }));
      setPoints(newPoints);
    };

    initGoogleMaps();
  }, []);

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

  const checkCollision = () => {
    setPoints((prevPoints) =>
      prevPoints.filter((point) => {
        const distance = Math.sqrt(
          (point.lat - playerRef.current.lat) ** 2 +
          (point.lng - playerRef.current.lng) ** 2
        );
        if (distance < 0.0005) {
          setScore((prevScore) => prevScore + 1);
          return false;
        }
        return true;
      })
    );
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <div className="absolute top-5 right-5 p-3 bg-gray-800 text-white rounded shadow-md z-10">
        Score: {score}
      </div>

      <div id="map" className="absolute w-full h-full top-0 left-0"></div>

      <Canvas shadows className="w-full h-full">
        <Suspense fallback={null}>
          <Physics timeStep="vary">
            <KeyboardControls map={keyboardMap} onChange={movePlayer}>
              <Controller maxVelLimit={5}>
                <Gltf
                  position={[0, 0, 0]}
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
    </div>
  );
};

export default UkraineWalk;