/* eslint-disable */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { load_textures } from '../utils/assets';
import { load_shaders } from '../utils/shaders';

import Trail from "./trail";

class Scene {
  constructor(container) {
    this.container = container;
    this._init();
  }

  async _init() {
    await load_shaders();

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
    this.camera.position.set(0, 0, 1);
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera)


    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.autoClear = false;
    this.container.appendChild(this.renderer.domElement)
    this.renderer.setClearColor(0xffffff, 1);

    // controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // events
    // resize
    window.addEventListener('resize', () => this._onWindowResize());
    // mouse move
    this.mouse = new THREE.Vector3;
    if (window.ontouchstart) {
      window.addEventListener("touchstart", (e) => this._onMouseUpdate(e), false);
      window.addEventListener("touchmove", (e) => this._onMouseUpdate(e), false);
    } else {
      window.addEventListener("mousemove", (e) => this._onMouseUpdate(e), false);
    }

    // clock
    this.clock = new THREE.Clock();

    // objects that implements (_onWindowResize(), _animate(), __onMouseUpdate())
    this.listeners = []

    // mouse trail
    this.trail = new Trail(this);

    this._animate();
  }

  _onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.listeners.forEach(listener => listener._onWindowResize(width, height));

    this.renderer.setSize(width, height);
  }

  _onMouseUpdate(e) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (e.changedTouches && e.changedTouches.length) {
      e.x = e.changedTouches[0].pageX;
      e.y = e.changedTouches[0].pageY;
    }
    if (e.x === undefined) {
      e.x = e.pageX;
      e.y = e.pageY;
    }

    // Get mouse value in -1 to 1 range, with y flipped
    this.mouse.set(
      (e.x / width) * 2 - 1,
      (e.y / height) * -2 + 1,
      0
    );

    this.listeners.forEach(listener => listener._onMouseUpdate(this.mouse));
  }

  _animate() {
    // const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    this.listeners.forEach(listener => listener._animate(time));

    this._render();
    requestAnimationFrame(() => this._animate());
  }

  _render() {
    // render geometry to screen
    this.renderer.render(this.scene, this.camera);
  }
}

export default Scene;