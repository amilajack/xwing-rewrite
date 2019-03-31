import * as THREE from 'three/build/three.module.js';
import PubSub from 'pubsub-js';

// Instantiate a loader
const loader = new THREE.GLTFLoader();

// Load a glTF resource
loader.load(
	// resource URL
	'/models/xwing/scene.gltf',
	// called when the resource is loaded
	function (gltf) {
    PubSub.publish('models.xwing.loaded', {
      gltf
    });
	},
	// called while loading is progressing
	function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    PubSub.publish('models.xwing.loading', {
      xhr
    });
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);
