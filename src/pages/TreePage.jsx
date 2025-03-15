// TreePage.js
import * as THREE from 'three';
import TreeScene from '../components/TreeScene';

const TreePage = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);

    TreeScene(scene);

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();
};

export default TreePage