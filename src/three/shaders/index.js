const importShader = async (directory) => {
  return {
    vertexShader: (await import(`./${directory}/vertex.glsl`)).default,
    fragmentShader: (await import(`./${directory}/fragment.glsl`)).default
  }
}

export default importShader;