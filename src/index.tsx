import * as THREE from 'three/build/three.module.js';
import WindowResize from 'threejs-window-resize';
import OrbitControlsFactory from 'three-orbit-controls';
import PubSub from 'pubsub-js';
import Stats from 'stats.js'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './models/x-wing-new'
import { KeyboardControls, TouchControls } from './controls';
import { isTouchDevice } from './helpers';
import './stars'
// import './sound';

// These CANNOT be overriden
export const CONFIG = {
  isTouchDevice: isTouchDevice()
};

// These can be overriden
export const DEFAULTS = {
  postprocessing: !CONFIG.isTouchDevice,
  antialias: !CONFIG.isTouchDevice,
  sizeRatio: CONFIG.isTouchDevice ? 3 : 1,
  aspectRatio: window.innerWidth / window.innerHeight
};

const DATA = {
  stars: undefined,
  xwing: undefined,
  trench: undefined
}

// Scene
const scene = new THREE.Scene();
// scene.fog = new THREE.Fog(0x000000, 20000, 25000);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  DEFAULTS.aspectRatio
);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 500;

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: DEFAULTS.antialias,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);

// Shadow
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.shadowMapBias = 0.0039;
// renderer.shadowMapDarkness = 0.5;
// renderer.shadowMapWidth = 1024 / (DEFAULTS.aspectRatio * 2);
// renderer.shadowMapHeight = 1024 / (DEFAULTS.aspectRatio * 2);
// renderer.shadowMapEnabled = true;
// renderer.shadowMapSoft = true;
// renderer.shadowCameraNear = 1;
// renderer.shadowCameraFar = 100000;
// renderer.shadowCameraFov = 50;

// // Gamma
renderer.gammaInput = true;
renderer.gammaOutput = true;

// Lights
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 1000, 100);
spotLight.target.position.set(0, 100, 0);
spotLight.castShadow = true;
spotLight.shadow.camera.near = 50;
spotLight.shadow.camera.far = 150;
scene.add(spotLight);
const ambientLight = new THREE.AmbientLight(0x111111, 0.6);
scene.add(ambientLight);

// Stats
const stats = new Stats();
if (process.env.NODE_ENV === 'development') {
  document.body.appendChild(stats.dom);
}

// Models
PubSub.subscribe('models.xwing.loaded', (msg, data: { gltf: { scene: Object } }) => {
  DATA.xwing = data.gltf.scene;
  scene.add(data.gltf.scene);
  // camera.position.x = DATA.xwing.position.x - 500
  // camera.position.y = DATA.xwing.position.y - 500
});
PubSub.publish('main.load.models.xwing', {});

// Development Tools
if (process.env.NODE_ENV === 'development') {
  // Orbit controls
  const OrbitControls = OrbitControlsFactory(THREE);
  DATA.orbitControls = new OrbitControls(camera, renderer.domElement);
  // Axes helper
  const axesHelper = new THREE.AxesHelper(500);
  scene.add(axesHelper);
  // Spotlight helper
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
}

// Controls
CONFIG.isTouchDevice ? TouchControls() : KeyboardControls();

// Stars
PubSub.subscribe('stars.loaded', (msg, data) => {
  DATA.stars = data.stars
  DATA.stars.position.y = 500
  scene.add(DATA.stars);
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if (process.env.NODE_ENV === 'development' && DATA.orbitControls) {
    DATA.orbitControls.update();
  }
  // @TODO
  // if (DEFAULTS.postprocessing) {
  //   composer.render(delta);
  // }
  if (process.env.NODE_ENV === 'development') { stats.update(); }
}

// Render buttons to initiate user interaction for sound
function Welcome() {
  return (
    <button onClick={() => PubSub.publish('welcome-button.clicked')}>Click to play</button>
  );
}
ReactDOM.render(<Welcome />, document.getElementById('root'));

WindowResize(renderer, camera);
animate();

PubSub.publish('main.initialized', {
  camera,
  scene
});
