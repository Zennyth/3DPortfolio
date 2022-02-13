<template>
  <div ref="container" class="background"></div>
</template>

<script>
import Gallery from "@/three/components/gallery"

export default {
  name: 'Gallery',
  data() {
    return {
      gallery: null
    }
  },
  async mounted() {
    this.gallery = new Gallery(this.$refs.container);
  }
}
</script>

<style scoped>
.background {
  background: black;
}
</style>