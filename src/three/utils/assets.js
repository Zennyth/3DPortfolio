/* eslint-disable */
import * as THREE from 'three';

const textures = {}
const texture_names = [];

const models = {}
const model_names = []

export function load_textures() {
  const loader = new THREE.TextureLoader().setPath('assets/textures/');
  const texture = Promise.all(texture_names.map(name => loader.load(name)), (resolve) => {
    resolve(texture);
  }).then(result => {
    result.forEach((texture, index) => {
      textures[texture_names[index].split(".")[0]] = texture;
    })
  });
  return texture;
}

// export function load_models() {
//   const load_model = (url) => {
//     return new Promise(resolve => {
//       new GLTFLoader()
//         .setPath('assets/models/')
//         .load(url, resolve);
//     });
//   }

//   const promises = Promise.all(model_names.map(name => load_model(name)), (resolve) => {
//     resolve(promises);
//   }).then(result => {
//     result.forEach((model, index) => {
//       models[model_names[index].split(".")[0]] = model;
//     })
//   });
//   return promises;
// }

export default {
  textures,
  models
}