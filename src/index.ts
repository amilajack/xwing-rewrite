import * as THREE from 'three/build/three.module.js';
import WindowResize from 'threejs-window-resize';
import OrbitControlsFactory from 'three-orbit-controls';
import GLTFLoader from 'three-gltf-loader';
import sound from './sound';

const OrbitControls = OrbitControlsFactory(THREE);

// Scene
const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 50000);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.x = -100;
camera.position.x = -1000;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);

// Shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// // Gamma
renderer.gammaInput = true;
renderer.gammaOutput = true;

// Lights
const light = new THREE.SpotLight(0x999999, 1, 0);
light.position.set(-100, 1000, 1000);
light.target.position.set(0, 0, -1000);
light.castShadow = true;
scene.add(light);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => {
  renderer.render(scene, camera);
});

// Models
// Instantiate a loader
const loader = new GLTFLoader();

// Load a glTF resource
loader.load(
	// resource URL
	'./models/x-wing-new/scene.gltf',
	// called when the resource is loaded
	(gltf) => {
    scene.add( gltf.scene );
		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Scene
		gltf.scenes; // Array<THREE.Scene>
		gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
    camera.lookAt(gltf.scene);
    gltf.scene.scale.set(0.4, 0.4, 0.4);
    gltf.scene.rotation.copy(new THREE.Euler(0, -3 * Math.PI / 4, 0));
    gltf.scene.position.set(2, 1, 0);
	},
	// called while loading is progressing
	(xhr) => {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	( error ) => {
    console.log(error)
		console.log( 'An error happened' );
	}
);

// Render loop
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  // controls.update();
}

WindowResize(renderer, camera);
animate();
