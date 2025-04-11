import { useState, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Gltf, Environment, Fisheye, KeyboardControls } from "@react-three/drei";
import Controller from "ecctrl";

const ModelScene = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const keyboardMap = useMemo(
    () => [
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
      { name: "rightward", keys: ["ArrowRight", "KeyD"] },
      { name: "jump", keys: ["Space"] },
      { name: "run", keys: ["Shift"] },
    ],
    []
  );

  return (
    <div className="w-screen h-screen  top-0 left-0 bg-gradient-to-br from-blue-900 to-black text-white">
   
      {/* Welcome Screen - Show only if the game hasn't started */}
   {!gameStarted && (
     <div className="absolute w-full h-full flex flex-col items-center justify-center text-white">
<h1 className="text-5xl font-bold mb-5">👻 Welcome to the Ghost Game!</h1>

<p className="text-lg mb-4 text-gray-300">Explore the unusal setting with Ghost</p>
      <div className="relative z-10 text-center">
     
        <button
          className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-300"
          onClick={() => setGameStarted(true)}
        >
          Play
        </button>
      </div>
    </div>
      )}

      {/* 3D Game Scene - Only Rendered After Clicking Play */}
      {gameStarted && (
        <Canvas shadows onPointerDown={(e) => e.target.requestPointerLock()} className="w-full h-full">
          <Suspense fallback={null}>
            <Fisheye zoom={0.4}>
              {/* Lighting */}
              <Environment files="night.hdr" ground={{ scale: 100 }} />
              <ambientLight intensity={0.5} />
              <directionalLight intensity={0.7} castShadow position={[-10, 20, 10]} />
              <pointLight position={[10, 10, 10]} intensity={1} />

              {/* Physics & Player */}
              <Physics timeStep="vary">
                <KeyboardControls map={keyboardMap}>
                  <Controller maxVelLimit={5}>
                    <Gltf
                      castShadow
                      receiveShadow
                      scale={0.315}
                      position={[0, -0.55, 0]}
                      src="ghost_w_tophat-transformed.glb"
                    />
                  </Controller>
                </KeyboardControls>

                {/* Environment Model */}
                <RigidBody type="fixed" colliders="trimesh">
                  <Gltf
                    castShadow
                    receiveShadow
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.11}
                    src="fantasy_game_inn2-transformed.glb"
                  />
                </RigidBody>
              </Physics>
            </Fisheye>
          </Suspense>
        </Canvas>
      )}

      {/* 🔹 Control Keys Overlay Image - Always Visible */}
      <img
        src="/controls.png"
        alt="Control Keys"
        className="absolute bottom-4 left-4 w-40 opacity-80 pointer-events-none"
      />
    </div>
  );
};

export default ModelScene;
