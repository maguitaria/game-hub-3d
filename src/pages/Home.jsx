import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { Text as DreiText } from "@react-three/drei";
import SplashCursor from "../../SplashCursor/SplashCursor";
import Ballpit from "../../SplashCursor/Ballpit";

const GradientBackground = () => {
    const shaderRef = useRef(null);
    const { size, gl } = useThree();
    const mouse = useRef(new THREE.Vector2());

    useEffect(() => {
        const handleMouseMove = (event) => {
            const x = (event.clientX / size.width) * 2 - 1;
            const y = -(event.clientY / size.height) * 2 + 1;
            mouse.current.set(x, y);
        };

        gl.domElement.addEventListener("mousemove", handleMouseMove);
        return () => gl.domElement.removeEventListener("mousemove", handleMouseMove);
    }, [gl, size]);

    useFrame(({ clock }) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.u_time.value = clock.getElapsedTime();
            shaderRef.current.uniforms.u_mouse.value = mouse.current;
        }
    });

    return (
        <mesh>
            <planeGeometry args={[10, 10]} />
            <shaderMaterial
                ref={shaderRef}
                uniforms={{
                    u_time: { value: 0 },
                    u_mouse: { value: new THREE.Vector2() },
                    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
                }}
                fragmentShader={`
                    precision mediump float;

                    uniform float u_time;
                    uniform vec2 u_mouse;
                    uniform vec2 u_resolution;

                    void main() {
                        vec2 st = gl_FragCoord.xy / u_resolution;
                        vec3 color = vec3(0.0);
                        color.r = 0.5 + 0.5 * sin(u_time + st.x * 10.0 + u_mouse.x * 5.0);
                        color.g = 0.5 + 0.5 * sin(u_time + st.y * 10.0 + u_mouse.y * 5.0);
                        color.b = 0.5 + 0.5 * sin(u_time + st.x * st.y * 20.0);
                        gl_FragColor = vec4(color, 1.0);
                    }
                `}
                vertexShader={`
                    void main() {
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center flex-grow text-center px-6">
                <SplashCursor />
                
                <h2 className="text-5xl font-extrabold mb-4">Welcome to Game Hub!</h2>

                <p className="text-lg text-gray-300 mb-6">Choose your adventure and start exploring different worlds.</p>
                <div className="flex space-x-6">
                    <Link to="/explore-game" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg text-lg font-semibold transition">
                        Play 3D Explore Game
                    </Link>
                    <Link to="/ghost-adventure" className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg text-lg font-semibold transition">
                        Play Ghost Adventure Game
                    </Link>
                    <Link to="/meditation-scene" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg text-lg font-semibold transition">
                        Relax Game
                    </Link>
                </div>
                <div style={{ position: 'relative', overflow: 'hidden', minHeight: '500px', maxHeight: '500px', width: '100%' }}>
                    <Ballpit
                        count={200}
                        gravity={0.7}
                        friction={0.8}
                        wallBounce={0.95}
                        followCursor={true}
                    />
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
