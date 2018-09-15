import * as THREE from 'three/build/three.module.js';
import WindowResize from 'threejs-window-resize';
import OrbitControlsFactory from 'three-orbit-controls';
import PubSub from 'pubsub-js';
import Stats from 'stats.js'
import './models/x-wing'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { isTouchDevice } from './helpers'
// import './sound';

// These CANNOT be overriden
const CONFIG = {
  isTouchDevice: isTouchDevice()
}

// These can be overriden
const DEFAULTS = {
  postprocessing: !CONFIG.isTouchDevice,
  antialias: !CONFIG.isTouchDevice,
  sizeRatio: CONFIG.isTouchDevice ? 3 : 1,
  aspectRatio: window.innerWidth / window.innerHeight
};

// Scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 20000, 25000);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  DEFAULTS.aspectRatio
);
camera.position.z = 5;
camera.position.x = -100;

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: DEFAULTS.antialias,
});
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
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 1000, 100);
spotLight.target.position.set(0, 100, 0);
spotLight.castShadow = true;
scene.add(spotLight);
const ambientLight = new THREE.AmbientLight(0x111111, 0.1);
scene.add(ambientLight);

// Stats
const stats = new Stats();
if (process.env.NODE_ENV === 'development') {
  document.body.appendChild(stats.dom);
}

PubSub.subscribe('models.xwing.loaded', (msg, data: { gltf: { scene: Object } }) => {
  scene.add(data.gltf.scene);
});

// Development Tools
if (process.env.NODE_ENV === 'development') {
  // Orbit controls
  const OrbitControls = OrbitControlsFactory(THREE);
  new OrbitControls(camera, renderer.domElement);
  // Axes helper
  const axesHelper = new THREE.AxesHelper(500);
  scene.add(axesHelper);
  // Spotlight helper
  var spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
}

// postprocessing
// let composer;
// let effectFocus;
// if (DEFAULTS.postprocessing) {
//   const renderModel = new THREE.RenderPass(scene, camera);
//   const effectBloom = new THREE.BloomPass(0.75);

//   const effectVignette = new THREE.ShaderPass(THREE.ShaderExtras.vignette);
//   effectVignette.uniforms.tDiffuse.texture = THREE.ImageUtils.loadTexture('img/Vignette_alpha.png');

//   effectFocus = new THREE.ShaderPass(THREE.ShaderExtras.focus);

//   effectFocus.uniforms.screenWidth.value = window.innerWidth / DEFAULTS.aspectRatio;
//   effectFocus.uniforms.screenHeight.value = window.innerHeight / DEFAULTS.aspectRatio;
//   effectFocus.uniforms.sampleDistance.value = 0;
//   effectFocus.uniforms.waveFactor.value = 0;

//   effectFocus.renderToScreen = true;

//   composer = new THREE.EffectComposer(renderer);

//   composer.addPass(renderModel);
//   composer.addPass(effectBloom);
//   composer.addPass(effectVignette);
//   composer.addPass(effectFocus);
// }

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if (DEFAULTS.postprocessing) {
    // composer.render(delta);
  }
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
