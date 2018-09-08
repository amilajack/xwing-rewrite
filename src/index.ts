import * as THREE from 'three/build/three.module.js';
import WindowResize from 'threejs-window-resize';
import OrbitControlsFactory from 'three-orbit-controls';
import './GLTFLoader';
// import model from '';
import sound from './sound';

const OrbitControls = OrbitControlsFactory(THREE);

// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 50000);
// const camera = new THREE.Camera(50, window.innerWidth / window.innerHeight, 1, 100000);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);

// Shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Gamma
renderer.gammaInput = true;
renderer.gammaOutput = true;

// Lights
const light = new THREE.SpotLight(0x999999, 0.7, 0);
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
const loader = new THREE.GLTFLoader();

// Load a glTF resource
loader.load(
	// resource URL
	'./models/x-wing/scene.gltf',
	// called when the resource is loaded
	(gltf) => {
    console.log(gltf)
    scene.add( gltf.scene );
    console.log('added to scene')
		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Scene
		gltf.scenes; // Array<THREE.Scene>
		gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
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
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update()
}

WindowResize(renderer, camera);
animate();
