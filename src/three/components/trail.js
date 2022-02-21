/* eslint-disable */

import { Vector3, Vector2, ShaderMaterial, Color, BufferGeometry, Line, Mesh, DoubleSide } from 'three';
import shaders from "../utils/shaders"


class Trail {
  constructor(scene) {
    this.scene = scene;
    this._init();
  }

  _init() {
    this.params = {
      spring: new Vector3(.06, .06),
      friction: new Vector3(.85, .85),
      velocity: new Vector3,
      length: 20
    }

    console.log(this.params)

    this.points = []
    // for (let i = 0; i < this.params.length; i++) this.points.push(new Vector3(i, i, 0));

    for (let i = 0; i < this.params.length; i++) {
      const x = i / (this.params.length - 1) - 0.5;
      const y = 0;
      const z = 0;
  
      this.points.push(new Vector3(x, y, z));
  };

    // material
    const shader = shaders.trail;
    this.material = new ShaderMaterial({
      ...shader,
      uniforms: {
        lineWidth: {
          value: 40
        }
      },
      side: DoubleSide
    })
    this.material.extensions.derivatives = true;
    // geometry
    this.geometry = new BufferGeometry()
      .setFromPoints(this.points);

    // line
    this.line = new Line( this.geometry, this.material );
    this.line.geometry.attributes.position.needsUpdate = true;

    this.scene.scene.add(this.line);
    this.scene.listeners.push(this);
  }

  _onWindowResize(width, height) {

  }

  _onMouseUpdate(mouse) {
    const temp = new Vector3;
    this.points.forEach((point, index) => {
      if(index === 0) {
        temp
          .copy(mouse)
          .sub(point)
          .multiply(this.params.spring)
        
        this.params.velocity
          .add(temp)
          .multiply(this.params.friction)
        
        point
          .add(this.params.velocity)
      } else {
        point.lerp(this.points[index-1], .9)
      }
    })
    this.line.geometry.setFromPoints(this.points);
  }

  _animate(time) {

  }
}

export default Trail