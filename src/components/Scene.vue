<template>
  <div ref="container" class="background">
  </div>
</template>

<script>
import Scene from "@/three/components/trail/scene"

export default {
  name: 'Scene',
  data() {
    return {
      gallery: null
    }
  },
  async mounted() {
    this.gallery = new Scene(this.$refs.container);
  }
}
</script>

<style lang="scss">


.background {
  background: rgb(224, 217, 217);
  overflow: hidden;
  width: 100%;
  height: 100%;
  
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>