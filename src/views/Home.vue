<template>
  <div class="home">
    <Hero />
    <Projects />
    <About />
  </div>
</template>

<script>
import Hero from "@/components/Hero"
import Projects from "@/components/projects/Projects"
import About from "@/components/about/About"

export default {
  name: 'Home',
  components: {
    Hero,
    Projects,
    About
  }
}
</script>

<style lang="scss">

</style>
