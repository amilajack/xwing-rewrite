import * as THREE from 'three/build/three.module.js';
import GLTFLoader from 'three-gltf-loader';
import PubSub from 'pubsub-js';

// Models
const loader = new GLTFLoader();
// Load x-wing model
loader.load(
  // resource URL
  './models/x-wing-new/scene.gltf',
  // called when the resource is loaded
  gltf => {
    gltf.scene.scale.set(0.8, 0.8, 0.8);
    gltf.scene.rotation.copy(new THREE.Euler(0, (-3 * Math.PI) / 4, 0));
    gltf.scene.position.set(0, 0, 0);
    PubSub.publish('models.xwing.loaded', {
      gltf
    });
  },
  // called while loading is progressing
  xhr => {
    PubSub.publish('models.xwing.loading', {
      xhr
    });
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  // called when loading has errors
  error => {
    PubSub.publish('models.xwing.error', {
      error
    });
    console.log(error);
  }
);
