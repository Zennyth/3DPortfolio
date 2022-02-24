<template>
  <div class="home">
    <Hero />
    <Projects />
  </div>
</template>

<script>
import Hero from "@/components/Hero"
import Projects from "@/components/projects/Projects"

export default {
  name: 'Home',
  components: {
    Hero,
    Projects
  }
}
</script>

<style lang="scss">

</style>
