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

import shaders from "../utils/shaders"

const Mode = {
  LOADER: 'LOADER',
  MOUSE: 'MOUSE'
}


class TrailPath {
  constructor() {
  }

  static getPosition(time) {
    const mod = time / 1000 % Math.PI;
    const inter = (mod - Math.PI) * 2;

    return new Vec3(Math.cos(inter), Math.sin(inter) * Math.cos(inter), 0)
      .divide(2);
  }
}

class Trail {
  constructor(main) {
    this.renderer = main.renderer;
    this.scene = main.scene;
    this._init();

    main.listeners.push(this);
  }

  _init() {
    // mode
    this.mode = Mode.LOADER;

    this.mouse = new Vec3;

    this.params = {
      spring: .06,
      friction: .85,
      velocity: new Vec3,
      length: 20
    }

    this.points = []
    for (let i = 0; i < this.params.length; i++) this.points.push(new Vec3());

    this.polyline = new Polyline(this.renderer.gl, {
      points: this.points,
      vertex: shaders.trail.vertexShader,
      uniforms: {
        uColor: { value: new Color("#1b1b1b") },
        uThickness: { value: 40 }
      }
    });

    this.polyline.mesh.setParent(this.scene);

    window.addEventListener('click', () => {
      this.mode = this.mode == Mode.MOUSE ? Mode.LOADER : Mode.MOUSE;
    })
  }

  _onWindowResize(width, height) {
    this.polyline.resize()
  }

  _onMouseUpdate(mouse) {
    this.mouse = mouse;
  }

  _animate(time) {
    const tmp = new Vec3;
    const reference = this.mode == Mode.MOUSE ? this.mouse : TrailPath.getPosition(time);
    // console.log(TrailPath.getPosition(time))
    // Update polyline input points
    for (let i = this.points.length - 1; i >= 0; i--) {
      if (!i) {
        // For the first point, spring ease it to the mouse position
        tmp
          .copy(reference)
          .sub(this.points[i])
          .multiply(this.params.spring);

        this.params.velocity
          .add(tmp)
          .multiply(this.params.friction);

        this.points[i]
          .add(this.params.velocity);
      } else {
        // The rest of the points ease to the point in front of them, making a line
        this.points[i].lerp(this.points[i - 1], 0.9);
      }
    }

    this.polyline.updateGeometry();
  }
}

export default Trail