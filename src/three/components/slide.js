/* eslint-disable */

import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

import gsap from "gsap"

import importShader from '../shaders';
const RESSOURCE_PATH = "/assets/models"

class Slide {
  constructor(scene, model, nbParticles = 6000) {
    this.scene = scene;
    this._load(model, nbParticles);
  }

  _load(model, nbParticles) {
    this.group = new THREE.Group();
    this.scene.add(this.group)
    this.nbParticles = nbParticles;

    const path = `${RESSOURCE_PATH}/${model}`;
    try {
      new OBJLoader().load(path, async (obj) => {

        this.shaders = {
          particles: await importShader('particles')
        }

        this.objects = obj.children.map(child => {
          child.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x000000,
            transparent: false,
            opacity: 1
          });
          return child
        })

        this.particles = new THREE.Group()
        this.objects.forEach(object => {
          this.initParticles(object, 6000 * 1/12, true);
          this.initParticles(object, 6000 * 11/12, false);
        })
        this.group.add(this.particles)

        // this._onEnter();
        

      })
    } catch (error) {
      throw new Error(`${path} n'a pas réussit à être chargé.`)
    }
  }

  initParticles(object, nb, color = false) {
    // particles
    const particles = {
      sampler: new MeshSurfaceSampler(object).build(),
      material: new THREE.ShaderMaterial({
        vertexShader: this.shaders.particles.vertexShader,
        fragmentShader: this.shaders.particles.fragmentShader,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: {
            value: 0
          },
          uScale: {
            value: 1
          },
        },
      }),
    }
    const baseGeometry = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const instancedGeometry = new THREE.InstancedBufferGeometry().copy(baseGeometry);
    instancedGeometry.instanceCount = nb;

    const positions = new Float32Array(nb * 4);
    const centers = new Float32Array(nb * 4);
    const colors = new Float32Array(nb * 3);
    const sizes = new Float32Array(nb * 3);
    for (let i = 0; i < nb; i++) {
      // color
      if (color) colors[i] = 1;
      // size
      sizes[i] = Math.random() * 0.75 + 0.5;
      // position
      const position = new THREE.Vector3();
      particles.sampler.sample(position);
      positions.set([position.x, position.y, position.z, .75], i * 4);
      centers.set([position.x, position.y, position.z, .75], i * 4);
    }
    instancedGeometry.setAttribute('aCenter', new THREE.InstancedBufferAttribute(positions, 4));
    instancedGeometry.setAttribute('aColor', new THREE.InstancedBufferAttribute(colors, 1));
    instancedGeometry.setAttribute('aSize', new THREE.InstancedBufferAttribute(sizes, 3));

    particles.instances = new THREE.InstancedMesh(instancedGeometry, particles.material, nb);
    particles.instances.layers.enable( color );
    particles.instances.material.uniformsNeedUpdate = true;

    this.particles.add(particles.instances)
  }

  _animate(time) {
    // Rotate the cube a little on each frame
    if (this.particles) {
      this.particles.children.forEach(instance => {
        instance.material.uniforms.uTime.value = time;
      })
    }
  }

  _onEnter() {
    return new Promise((resolve) => {
      gsap.to(this.particles.instances.material.uniforms.uScale, {
        duration: 1.2,
        value: 1,
        onComplete: () => {
          // this._onLeave()
          resolve()
        }
      });
    });
  }

  _onLeave() {
    return new Promise((resolve) => {
      gsap.to(this.particles.instances.material.uniforms.uScale, {
        duration: 1.2,
        value: 0,
        onComplete: () => {
          // this._onEnter()
          resolve()
        }
      });
    });
  }
}

export default Slide;