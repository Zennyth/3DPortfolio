<template>
  <div class="home">
    <Scene />
  </div>
</template>

<script>
import Scene from "@/components/Scene"

export default {
  name: 'Home',
  components: {
    Scene
  }
}
</script>

<style lang="scss">
.home {
  width: 100vw;
  height: 100vh;
}
</style>
