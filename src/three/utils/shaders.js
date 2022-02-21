import importShader from "../shaders";

const shaders = {}
const shader_names = ['trail']

export function load_shaders() {
  const promises = Promise.all(shader_names.map(name => importShader(name)), (resolve) => {
    resolve(promises);
  }).then(result => {
    result.forEach((shader, index) => {
      shaders[shader_names[index]] = shader;
    })
  });
  return promises;
}

export default shaders;