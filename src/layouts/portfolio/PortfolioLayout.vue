<template>
  <div class="app">
    <div class="background" ref="background"></div>
    <Navbar />
    <div class="wrapper">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
</style>
<script>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import Scene from "@/three/components/trail/scene";

export default {
  components: {
    Navbar, 
    Footer
  },
  mounted() {
    this.scene = new Scene(this.$refs.background)
  }
};
</script>