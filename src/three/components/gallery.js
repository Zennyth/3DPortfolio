/* eslint-disable */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { UnrealBloomPass } from '../customs/UnrealBloomPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import Slide from "./slide"

import importShader from '../shaders';

class Gallery {
  constructor(container) {
    this.container = container;
    this._init();
  }

  async _init() {
    // shaders
    this.shaders = {
    }

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
    this.camera.position.set(0, 0, 4);

    this.scene = new THREE.Scene();
    // clean scene
    this.scene.traverse((obj) => this.disposeMaterial(obj));
    this.scene.children.length = 0;
    // this.scene.background = null;

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 0, 10);
    //  this.scene.add(light);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.physicallyCorrectLights = true;
    // this.renderer.setClearColor(0xffffff, 0);
    this.container.appendChild(this.renderer.domElement);

    // controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // custom
    this.slide = new Slide(this.scene, 'cloud.obj');

    // events
    window.addEventListener('resize', () => this._onWindowResize());

    // clock
    this.clock = new THREE.Clock();

    // render
    const renderScene = new RenderPass(this.scene, this.camera)
    // bloom
    const params = {
      exposure: 1,
      bloomStrength: 1,
      bloomThreshold: 0,
      bloomRadius: 0
    }
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, .4, .85)
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;
    // selective
    this.bloom = {
      const: {
        ENTIRE_SCENE: 0,
        BLOOM_SCENE: 1
      },
      layer: new THREE.Layers(),
      darkMaterial: new THREE.MeshBasicMaterial({ color: 'black' }),
      materials: {}
    }
    this.bloom.layer.set(this.bloom.const.BLOOM_SCENE);

    this.bloomComposer = new EffectComposer(this.renderer);
    this.bloomComposer.renderToScreen = false;
    this.bloomComposer.addPass(renderScene);
    this.bloomComposer.addPass(bloomPass);

    const bloomShader = await importShader('bloomSelect');
    const finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this.bloomComposer.renderTarget2.texture }
        },
        vertexShader: bloomShader.vertexShader,
        fragmentShader: bloomShader.fragmentShader,
        defines: {}
      }), 'baseTexture'
    );
    finalPass.needsSwap = true;

    // composer
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderScene);
    this.composer.addPass(finalPass);

    this._animate();
  }

  _onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
    this.bloomComposer.setSize(width, height);
  }

  _animate() {
    // const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // customs
    this.slide._animate(time);

    this._render();
    requestAnimationFrame(() => this._animate());
  }

  _render() {
    this.camera.lookAt(this.scene.position);

    // scene + bloom
    this.renderBloom(true);
    this.composer.render()

    // bloom only
    // this.renderBloom(false);

    // scene only
    // this.renderer.render(this.scene, this.camera)
  }

  renderBloom(mask) {
    if (mask === true) {
      this.scene.traverse(obj => this.darkenNonBloomed(obj));
      this.bloomComposer.render();
      this.scene.traverse(obj => this.restoreMaterial(obj));
    } else {
      this.camera.layers.set(this.bloom.const.BLOOM_SCENE);
      this.bloomComposer.render();
      this.camera.layers.set(this.bloom.const.ENTIRE_SCENE);
    }
  }

  darkenNonBloomed(obj) {
    if (obj.isMesh && this.bloom.layer.test(obj.layers) === false) {
      this.bloom.materials[obj.uuid] = obj.material;
      obj.material = new THREE.MeshBasicMaterial({ color: 'black' });
    }
  }

  restoreMaterial(obj) {
    if (this.bloom.materials[obj.uuid]) {
      obj.material = this.bloom.materials[obj.uuid];
      delete this.bloom.materials[obj.uuid];
    }
  }

  disposeMaterial(obj) {
    if (obj.material) {
      obj.material.dispose();
    }
  }

}

export default Gallery;