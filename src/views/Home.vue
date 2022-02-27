<template>
  <div class="home">
    <Hero />
    <Projects />
    <About />
    <Contact />
  </div>
</template>

<script>
import Hero from "@/components/Hero"
import Projects from "@/components/projects/Projects"
import About from "@/components/about/About"
import Contact from "@/components/Contact"

export default {
  name: 'Home',
  components: {
    Hero,
    Projects,
    About,
    Contact
  }
}
</script>

<style lang="scss">

</style>
