import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GUI } from 'dat.gui';

// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0d8f0); // Light sky blue

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Ground
const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Trees (Simple Cylinders + Spheres)
function createTree(x, z) {
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 16);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, 0.5, z);
    scene.add(trunk);

    const leavesGeometry = new THREE.SphereGeometry(0.7, 16, 16);
    const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(x, 1.3, z);
    scene.add(leaves);
}

createTree(-2, -2);
createTree(2, -3);
createTree(-3, 2);
createTree(3, 3);

// Load a 3D Rock Model (optional, can replace with other nature objects)
const loader = new GLTFLoader();
loader.load('public/rock_model.glb', function (gltf) {
    const rock = gltf.scene;
    rock.position.set(0, 0, 0);
    scene.add(rock);
});

// User Interaction - Click to Change Tree Colors
window.addEventListener('click', (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj.material.color) {
            obj.material.color.set(Math.random() * 0xffffff);
        }
    }
});

// Overlay (GUI for Name, Title, and Logo)
const gui = new GUI();
gui.add({ Name: 'Mariia Glushenkova' }, 'Name');
gui.add({ Title: 'Nature Scene - Three.js Project' }, 'Title');
gui.add({ University: 'FH University' }, 'University');

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Responsive Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
