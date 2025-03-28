import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Controls from '../components/Controls';
import '../styles/App.css';
import Rain from '../components/Rain';
import { Canvas } from '@react-three/fiber';

const MeditationScene = () => {
    const [audio, setAudio] = useState(null);
    const [volume, setVolume] = useState(0.5);

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87CEEB); // Sky Blue

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 8);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
       

      

        // Controls
        const controls = Controls(camera, renderer);

        // Render Loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Responsive Window Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

       
    }, []);

    const playMusic = (track) => {
        if (audio) {
            audio.pause();
        }
        const newAudio = new Audio(`/music/${track}`);
        newAudio.loop = true;
        newAudio.volume = volume;
        newAudio.play();
        setAudio(newAudio);
    };

    const adjustVolume = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
        if (audio) {
            audio.volume = newVolume;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-gray-900">
   
            <div className="p-6 bg-white shadow-lg rounded-lg text-center mt-6">
                <h2 className="text-2xl font-semibold mb-4">Select Meditation Music</h2>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={() => playMusic('morning.mp3')}>🌅 Morning Energy</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => playMusic('evening.mp3')}>🌙 Evening Relaxation</button>
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600" onClick={() => playMusic('rain.mp3')}>⏳ Quick Meditation</button>
                </div>
                <div className="mt-4">
                    <label className="block text-lg font-medium">Adjust Volume</label>
                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={adjustVolume} className="w-full mt-2" />
                </div>
                
            </div>
                            
            <Canvas camera={{ position: [0, 20, 50], fov: 75 }}>
  <ambientLight intensity={0.5} />
  <directionalLight position={[0, 10, 5]} intensity={1} />
  <Rain />
</Canvas>
        </div>
        
    );
};

export default MeditationScene;
