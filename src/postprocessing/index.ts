// @TODO
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
