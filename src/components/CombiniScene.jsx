import { Canvas } from "@react-three/fiber";
import { Gltf, Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

const CombiniScene = () => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <Canvas shadows className="w-full h-full">
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.7} castShadow position={[-10, 20, 10]} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          {/* Environment for realistic reflections */}
          <Environment preset="sunset" />

          {/* OrbitControls for model interaction */}
          <OrbitControls />

          {/* Displaying the Model */}
          <Gltf
            castShadow
            receiveShadow
            position={[0, -1, 0]} // Adjust ground position
            rotation={[0, 0, 0]} // Adjust rotation if needed
            scale={[10, 10, 10]} // Adjust scale if too small
            src="oxxo.glb"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CombiniScene;
