<template>
  <div class="background" ref="background"></div>
  <router-view/>
</template>

<style lang="scss">
</style>
<script>
import Scene from "@/three/components/scene";

export default {
  mounted() {
    this.scene = new Scene(this.$refs.background)
  }
};
</script>