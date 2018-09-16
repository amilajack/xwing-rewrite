import * as THREE from 'three/build/three.module.js';
import explosionSound from './explosion.ogg'
// @TODO
// import blasterSound from './blaster.ogg'
// import musicSound from './music.ogg'

const {
  AudioListener,
  PositionalAudio,
  AudioLoader
} = THREE;

async function getAudioBufer(audioLoader, sound: { url: string }) {
  return new Promise(resolve => {
    audioLoader.load(sound.url, resolve)
  })
}

const audioLoader = new AudioLoader();
const explosionSoundBuffer = getAudioBufer(audioLoader, explosionSound);
// @TODO
// const blasterSoundBuffer = getAudioBufer(audioLoader, blasterSound);
// const musicSoundBuffer = getAudioBufer(audioLoader, musicSound);

PubSub.subscribe('main.initialized', (msg, { camera }) => {
  camera.listener = new AudioListener()
  camera.add(camera.listener);
});

PubSub.subscribe('xwing.sound.impact', (msg, { camera, xwing }) => {
  const sound = new PositionalAudio(camera.listener)
  sound.setBuffer(explosionSoundBuffer)
  sound.setRefDistance(100)
  xwing.add(sound)
  sound.play()
});
