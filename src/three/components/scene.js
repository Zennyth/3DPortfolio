/* eslint-disable */
import {
  Polyline,
  Renderer,
  Transform,
  Geometry,
  Program,
  Mesh,
  Vec3,
  Vec2,
  Color
} from "ogl";
import { load_shaders } from '../utils/shaders';

import Trail from "./trail";

class Scene {
  constructor(container) {
    this.container = container;
    this._init();
  }

  async _init() {
    await load_shaders();

    this.renderer = new Renderer({ dpr: 2 });
    this.container.appendChild(this.renderer.gl.canvas);
    this.renderer.gl.clearColor(0.9, 0.9, 0.9, 1);
    this.scene = new Transform();
    
    // objects that implements (_onWindowResize(), _animate(), __onMouseUpdate())
    this.listeners = []

    // events
    // resize
    window.addEventListener('resize', () => this._onWindowResize());
    this._onWindowResize()
    // mouse move
    this.mouse = new Vec3;
    if (window.ontouchstart) {
      window.addEventListener("touchstart", (e) => this._onMouseUpdate(e), false);
      window.addEventListener("touchmove", (e) => this._onMouseUpdate(e), false);
    } else {
      window.addEventListener("mousemove", (e) => this._onMouseUpdate(e), false);
    }


    // mouse trail
    this.trail = new Trail(this);

    this._animate();
  }

  _onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

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

    this.listeners.forEach(listener => listener._animate());

    this._render();
    requestAnimationFrame(() => this._animate());
  }

  _render() {
    // render geometry to screen
    this.renderer.render({ scene: this.scene });
  }
}

export default Scene;