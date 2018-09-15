import * as THREE from 'three/build/three.module.js';

PubSub.subscribe('main.initialized', (msg, { scene }) => {
  const geometry = new THREE.Geometry();

  for (let i = 0; i < 1000; i++) {
    const vector = new THREE.Vector3(
      Math.random() * 10000 - 5000,
      Math.random() * 400 - 400,
      Math.random() * 20000 - 10000
    );
    geometry.vertices.push(new THREE.Vertex(vector));
  }

  const particleImage = THREE.ImageUtils.loadTexture('img/star.png');
  const particleMaterial = new THREE.ParticleBasicMaterial({
    size: 48,
    map: particleImage,
    opacity: 1.0,
    transparent: false,
    depthTest: true,
    blending: THREE.NormalBlending
  });

  const particles = new THREE.ParticleSystem(geometry, particleMaterial);

  particles.position.z = -12000;
  particles.position.y = 2000;

  scene.add(particles)
})
