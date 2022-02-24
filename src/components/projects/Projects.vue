<template>
  <div class="projects section" ref="container">
    <div class="projects__wrapper" ref="projects">
      <div class="projects__wrapper-link">
        <h1>INSEE - TBEF</h1>
        <span>First professionnal project</span>
        <img :src="require('@/assets/images/img1.jpg')" alt="Some image" />
      </div>
      <div class="projects__wrapper-link">
        <h1>INSEE - TBEF</h1>
        <span>First professionnal project</span>
        <img :src="require('@/assets/images/img1.jpg')" alt="Some image" />
      </div>
      <div class="projects__wrapper-link">
        <h1>INSEE - TBEF</h1>
        <span>First professionnal project</span>
        <img :src="require('@/assets/images/img1.jpg')" alt="Some image" />
      </div>
    </div>
  </div>
</template>
<script>
import animations from "@/mixins/animations";
import Scene from "@/three/components/hover/scene"

export default {
  mixins: [animations],
  mounted() {
    this.hover = new Scene(this.$refs.container, this.$refs.projects)
  }
};
</script>
<style>
</style>
