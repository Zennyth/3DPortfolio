<template>
  <div class="app" ref="app">
    <div class="background" ref="background"></div>

    <div v-show="isAppLoaded">
      <Navbar />
      <div class="wrapper">
        <router-view />
      </div>
      <Footer />
    </div>
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
    Footer,
  },
  mounted() {
    this.scene = new Scene(this.$refs.background)

    window.document.title = 'Porftolio Mathis FIGUET'
    // this.scrollbar = new Scrollbar(this.$refs.app)
  },
  computed: {
    isAppLoaded() {
      const state = this.$store.getters.loaded 

      if(state === true) {
        this.$nextTick(() => {
          this.scene._onReady()
          if(this.scene?.trail) {
            this.scene.trail._updateModeToMouse()
            this.scene._onWindowResize()
          }
        })
      }

      return state
    }
  },
};
</script>