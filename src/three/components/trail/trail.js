/* eslint-disable */

import { Polyline, Vec3, Color, Vec2 } from "ogl";

import shaders from "../../utils/shaders";

const Mode = {
  LOADER: "LOADER",
  MOUSE: "MOUSE",
};

class TrailPath {
  constructor() {}

  static getPosition(time) {
    const mod = (time / 1000) % Math.PI;
    const inter = (mod - Math.PI) * 2;

    return new Vec3(
      Math.cos(inter),
      Math.sin(inter) * Math.cos(inter),
      0
    ).divide(2);
  }
}

class Trail {
  constructor(main) {
    this.renderer = main.renderer;
    this.scene = main.scene;
    this.main = main;
    this._init();

    main.listeners.push(this);
  }

  _updateModeToMouse() {
    this.mode = Mode.MOUSE;
  }

  _init() {
    // mode
    this.mode = !this.main.isReady ? Mode.LOADER : Mode.MOUSE;

    this.mouse = new Vec3();

    this.lines = [];

    function random(a, b) {
      const alpha = Math.random();
      return a * (1.0 - alpha) + b * alpha;
    }

    ["#3a6df0", "#222a42", "#555"].forEach(
      (color, i) => {
        // Store a few values for each lines' randomised spring movement
        const line = {
          spring: random(0.02, 0.1),
          friction: random(0.7, 0.95),
          mouseVelocity: new Vec3(),
          mouseOffset: new Vec3(random(-1, 1) * 0.0),
        };

        // Create an array of Vec3s (eg [[0, 0, 0], ...])
        const count = 20;
        const points = (line.points = []);
        for (let i = 0; i < count; i++) points.push(new Vec3());

        line.polyline = new Polyline(this.renderer.gl, {
          points,
          vertex: shaders.trail.vertexShader,
          uniforms: {
            uColor: { value: new Color(color) },
            uThickness: { value: random(20, 50) },
          },
        });

        line.polyline.mesh.setParent(this.scene);

        this.lines.push(line);
      }
    );

    window.addEventListener('click', () => {
      this.mode = this.mode == Mode.MOUSE ? Mode.LOADER : Mode.MOUSE;
    })
  }

  _onWindowResize(width, height) {
    this.lines.forEach((line) => line.polyline.resize());
  }

  _onMouseUpdate(mouse) {
    this.mouse = mouse;
  }

  _animate(time) {
    const tmp = new Vec3();
    const reference =
      this.mode == Mode.MOUSE ? this.mouse : TrailPath.getPosition(time);

    this.lines.forEach((line) => {
      // Update polyline input points
      for (let i = line.points.length - 1; i >= 0; i--) {
        if (!i) {
          tmp
            .copy(reference)
            .add(line.mouseOffset)
            .sub(line.points[i])
            .multiply(line.spring);
          line.mouseVelocity.add(tmp).multiply(line.friction);
          line.points[i].add(line.mouseVelocity);
        } else {
          // The rest of the points ease to the point in front of them, making a line
          line.points[i].lerp(line.points[i - 1], 0.9);
        }
      }
      line.polyline.updateGeometry();
    });

  }
}

export default Trail;
