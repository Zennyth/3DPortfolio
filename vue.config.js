// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('glsl')
      .test(/\.(frag|vert|glsl)$/)
      .use('glsl-shader-loader')
        .loader('glsl-shader-loader')
        .end()

    config.module
      .rule('gltf')
      .test(/\.(gltf)$/)
      .use('gltf-webpack-loader')
        .loader('gltf-webpack-loader')
        .end()
  }
}