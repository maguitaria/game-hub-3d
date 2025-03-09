import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import SceneElements from '../components/SceneElements';
import Controls from '../components/Controls';
import Navbar from '../components/Navbar';
import '../styles/App.css';

const MeditationScene = () => {
    const mountRef = useRef(null);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87CEEB); // Sky Blue

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 8);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Add Scene Elements (Trees, Sun, Ground)
        SceneElements(scene);

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

        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    const playMusic = (track) => {
        if (audio) {
            audio.pause();
        }
        const newAudio = new Audio(`/music/${track}`);
        newAudio.loop = true;
        newAudio.play();
        setAudio(newAudio);
    };

    return (
        <div>
            <Navbar />
            <div className="controls-container">
                <h2>Select Meditation Music</h2>
                <button onClick={() => playMusic('morning.mp3')}>🌅 Morning Energy</button>
                <button onClick={() => playMusic('evening.mp3')}>🌙 Evening Relaxation</button>
                <button onClick={() => playMusic('piano_birds.mp3')}>⏳ Quick Meditation</button>
            </div>
            <div ref={mountRef} className="scene-container"></div>
        </div>
    );
};

export default MeditationScene;