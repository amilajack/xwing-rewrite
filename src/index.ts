import * as THREE from 'three/build/three.module.js';
import WindowResize from 'threejs-window-resize';
import OrbitControlsFactory from 'three-orbit-controls';
import GLTFLoader from 'three-gltf-loader';
import Stats from 'stats.js'
import sound from './sound';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
camera.position.z = 5;
camera.position.x = -100;

// Renderer
const renderer = new THREE.WebGLRenderer();
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
const spotLight = new THREE.SpotLight(0x999999, 1, 0);
spotLight.position.set(100, 1000, 100);
spotLight.target.position.set(0, 100, 0);
spotLight.castShadow = true;
scene.add(spotLight);

// Stats
const stats = new Stats();
if (process.env.NODE_ENV === 'development') {
  document.body.appendChild(stats.dom);
}

// Development Tools
if (process.env.NODE_ENV === 'development') {
  // Orbit controls
  const OrbitControls = OrbitControlsFactory(THREE);
  const controls = new OrbitControls(camera, renderer.domElement);
  // Axes helper
  const axesHelper = new THREE.AxesHelper(500);
  scene.add(axesHelper);
  // Spotlight helper
  var spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
}

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
    // camera.lookAt(gltf.scene)
    scene.add(gltf.scene);
  },
  // called while loading is progressing
  xhr => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  // called when loading has errors
  error => {
    console.log(error);
  }
);

// Render loop
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  if (process.env.NODE_ENV === 'development') {
    stats.update()
  }
}

WindowResize(renderer, camera);
animate();
