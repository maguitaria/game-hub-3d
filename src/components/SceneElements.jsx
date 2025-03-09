import * as THREE from 'three';

const SceneElements = (scene) => {
    // Ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Trees
    function createTree(x, z) {
        const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 16);
        const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(x, 0.5, z);
        scene.add(trunk);

        const leavesGeometry = new THREE.SphereGeometry(0.9, 16, 16);
        const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x2E8B57 });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.set(x, 1.5, z);
        scene.add(leaves);
    }

    createTree(-3, -3);
    createTree(3, -4);
    createTree(-4, 3);
    createTree(4, 4);

    // Dynamic Sky (Moving Sun)
    const sunGeometry = new THREE.SphereGeometry(1, 16, 16);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(-10, 10, -10);
    scene.add(sun);

    function animate() {
        requestAnimationFrame(animate);
        sun.position.x = Math.sin(Date.now() * 0.0005) * 15;
        sun.position.y = Math.cos(Date.now() * 0.0005) * 10 + 10;
    }
    animate();
};

export default SceneElements;
