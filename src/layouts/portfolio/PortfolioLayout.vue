<template>
  <div class="app" ref="app">
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
// import Scrollbar from 'smooth-scrollbar';

export default {
  components: {
    Navbar, 
    Footer
  },
  mounted() {
    this.scene = new Scene(this.$refs.background)
    // this.scrollbar = new Scrollbar(this.$refs.app)
  }
};
</script>