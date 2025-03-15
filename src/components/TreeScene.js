// TreeScene.js
import * as THREE from 'three';

const TreeScene = (scene) => {
    function createTree(x, z) {
        const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.3, 2, 16);
        const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B5A2B });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(x, 1, z);
        scene.add(trunk);

        const leavesGeometry = new THREE.SphereGeometry(1.5, 16, 16);
        const leafColors = [0x2E8B57, 0x3CB371, 0x228B22];
        const leavesMaterial = new THREE.MeshStandardMaterial({ color: leafColors[Math.floor(Math.random() * leafColors.length)] });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.set(x, 2.5, z);
        scene.add(leaves);
    }

    createTree(-5, -5);
    createTree(5, -5);
    createTree(-5, 5);
    createTree(5, 5);
};

export default TreeScene;
