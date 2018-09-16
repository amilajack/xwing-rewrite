import * as THREE from 'three/build/three.module.js';
import PubSub from 'pubsub-js'

PubSub.subscribe('main.initialized', (msg, { scene }) => {
  const geometry = new THREE.Geometry();

  for (let i = 0; i < 1000; i++) {
    const vector = new THREE.Vector3(
      Math.random() * 10000 - 5000,
      Math.random() * 400 - 400,
      Math.random() * 20000 - 10000
    );
    geometry.vertices.push(new THREE.Vector3(vector));
  }
  const particleImage = new THREE.TextureLoader().load('img/star.png');
  const particleMaterial = new THREE.PointsMaterial({
    size: 48,
    map: particleImage,
    opacity: 1,
    transparent: false,
    depthTest: true,
    blending: THREE.NormalBlending
  });

  const particles = new THREE.Points(geometry, particleMaterial);
  particles.position.z = 0;
  particles.position.y = 0;

  scene.add(particles)
})
