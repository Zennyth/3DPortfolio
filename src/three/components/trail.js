/* eslint-disable */

import { Vector3, Vector2, ShaderMaterial, Color, BufferGeometry, Line, Mesh, DoubleSide, Float32BufferAttribute } from 'three';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';

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

    this.points = []
    for (let i = 0; i < this.params.length; i++) this.points.push(i, i, 0);
    this._computeNextPositions();
    this._computePrevPositions();

    // for (let i = 0; i < this.params.length; i++) {
    //   const x = i / (this.params.length - 1) - 0.5;
    //   const y = 0;
    //   const z = 0;
  
    //   this.points.push(new Vector3(x, y, z));
    // };

    // material
    const shader = shaders.trail;
    // this.material = new ShaderMaterial({
    //   ...shader,
    //   uniforms: {
    //     uResolution: { value: new Vector2(100, 100) },
    //     uDPR: { value: 2 },
    //     uThickness: { value: 1 }
    //   },
    //   side: DoubleSide
    // })
    // this.material.extensions.derivatives = true;
    this.material = new LineMaterial( {

      color: 0x000000,
      linewidth: .1, // in world units with size attenuation, pixels otherwise

      //resolution:  // to be set by renderer, eventually

    } );

    // geometry
    this.geometry = new LineGeometry()
      // .setAttribute('prev', this.prev)
      // .setAttribute('next', this.next)
      .setPositions(this.points);

    // line
    this.line = new Line2( this.geometry, this.material );
    this.line.computeLineDistances();
		this.line.scale.set( 1, 1, 1 );
    // this.line.geometry.attributes.position.needsUpdate = true;

    this.mouse = new Vector3;

    this.scene.scene.add(this.line);
    this.scene.listeners.push(this);
  }

  _onWindowResize(width, height) {

  }

  _onMouseUpdate(mouse) {
    this.mouse = mouse
  }

  _animate(time) {
    // const temp = new Vector3;
    // this.points.forEach((point, index) => {
    //   if(index === 0) {
    //     temp
    //       .copy(this.mouse)
    //       .sub(point)
    //       .multiply(this.params.spring)
        
    //     this.params.velocity
    //       .add(temp)
    //       .multiply(this.params.friction)
        
    //     point
    //       .add(this.params.velocity)
    //   } else {
    //     point.lerp(this.points[index-1], .9)
    //   }
    // })

    // this._computeNextPositions();
    // this._computePrevPositions();

    // this.line.geometry
    //   .setAttribute('prev', this.prev)
    //   .setAttribute('next', this.next)
    //   .setFromPoints(this.points);
  }

  _computeNextPositions() {
    this.prev = Array(this.points.length * 3);
    this.points.forEach((point, index) => {
      const nextIndex = index == this.points.length - 1 ? 0 : index + 1;

      this.prev[(nextIndex * 3) + 0] =  point.x;
      this.prev[(nextIndex * 3) + 1] =  point.y;
      this.prev[(nextIndex * 3) + 2] =  point.z;
    })
    this.prev = new Float32BufferAttribute(this.prev, 3);
  }

  _computePrevPositions() {
    this.next = Array(this.points.length * 3);
    this.points.forEach((point, index) => {
      const prevIndex = index == 0 ? this.points.length - 1 : index - 1;

      this.next[(prevIndex * 3) + 0] =  point.x;
      this.next[(prevIndex * 3) + 1] =  point.y;
      this.next[(prevIndex * 3) + 2] =  point.z;
    })

    this.next = new Float32BufferAttribute(this.next, 3);
  }
}

export default Trail