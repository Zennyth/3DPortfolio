<template>
  <div class="app">
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

export default {
  components: {
    Navbar, 
    Footer
  }
};
</script>