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
    <div className="w-screen h-screen fixed top-0 left-0">
      {/* Welcome Screen - Show only if the game hasn't started */}
      {!gameStarted && (
        <div className="absolute w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-80 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Game</h1>
          <button
            className="px-6 py-3 bg-green-500 hover:bg-green-700 text-white font-bold text-xl rounded-md shadow-md"
            onClick={() => setGameStarted(true)}
          >
            Play
          </button>
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
