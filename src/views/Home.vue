<template>
  <div class="home">
    <Gallery />
  </div>
</template>

<script>
import Gallery from "@/components/Gallery"

export default {
  name: 'Home',
  components: {
    Gallery
  }
}
</script>

<style lang="scss">
.home {
  width: 100vw;
  height: 100vh;
}
</style>
