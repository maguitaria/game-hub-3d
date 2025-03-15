import * as THREE from 'three';
const SceneElements = (scene) => {
   
    // Trees with Unique Colors
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

    // Sky with Smooth Transition and Clouds
    let time = 0;
    function updateSkyColor() {
        time += 0.001;
        const colorShift = (Math.sin(time) + 1) / 2;
        const skyColor = new THREE.Color().lerpColors(new THREE.Color(0x87CEEB), new THREE.Color(0xFFAD60), colorShift);
        scene.background = skyColor;
        requestAnimationFrame(updateSkyColor);
    }
    updateSkyColor();

    // Cloud Animation
    function createCloud(x, y, z) {
        const cloudGeometry = new THREE.SphereGeometry(1.5, 12, 12);
        const cloudMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.8 });
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(x, y, z);
        scene.add(cloud);

        function animateCloud() {
            cloud.position.x += 0.01;
            if (cloud.position.x > 30) cloud.position.x = -30;
            requestAnimationFrame(animateCloud);
        }
        animateCloud();
    }

    createCloud(-10, 10, -5);
    createCloud(5, 12, 0);
    createCloud(-5, 14, 5);

    // Sun with Smooth Motion
    const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700, emissive: 0xFFA500 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    function animateSun() {
        const t = Date.now() * 0.0001;
        sun.position.x = Math.sin(t) * 20;
        sun.position.y = Math.cos(t) * 15 + 10;
        requestAnimationFrame(animateSun);
    }
    animateSun();
};

export default SceneElements;
