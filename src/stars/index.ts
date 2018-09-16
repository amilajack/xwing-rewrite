import * as THREE from 'three/build/three.module.js';
import PubSub from 'pubsub-js';

PubSub.subscribe('main.initialized', (msg, { scene }) => {
  const starsGeometry = new THREE.Geometry();

  for (let i = 0; i < 10000; i++) {
    const star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread(Math.random() * 100000);
    star.y = THREE.Math.randFloatSpread(Math.random() * 10000);
    star.z = THREE.Math.randFloatSpread(Math.random() * 20000);
    starsGeometry.vertices.push(star);
  }

  console.log('adfs')

  const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });
  const stars = new THREE.Points(starsGeometry, starsMaterial);

  PubSub.publish('stars.loaded', {
    stars
  });

  scene.add(stars)
});
