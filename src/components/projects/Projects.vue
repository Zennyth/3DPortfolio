<template>
  <div class="projects section" id="projects" ref="container">
    <animated>
      <h1>Projects</h1>
    </animated>

    <div class="projects__wrapper" ref="projects">
      <animated :index="1">
        <div
          class="projects__wrapper-link"
          :data-index="1"
          :key="1"
          @click="href('https://www.insee.fr/fr/outil-interactif/5367857/')"
        >
          <div class="description">
            <h1>INSEE - TBEF</h1>
            <span>First professional project</span>
            <img :src="require('@/assets/images/Insee.jpg')" alt="Some image" />
          </div>
          <div class="actions">
            <div class="linkarrow">
              <span class="linkarrow-arrow left">
                <span class="shaft"></span>
              </span>
              <span class="main">
                <span class="text">View live</span>
                <span class="linkarrow-arrow right">
                  <span class="shaft"></span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div
          class="projects__wrapper-link"
          :data-index="2"
          :key="2"
          @click="href('https://think-together.mathis-figuet.com/login')"
        >
          <div class="description">
            <h1>THINK TOGETHER</h1>
            <span>Etherpad for developers</span>
            <img :src="require('@/assets/images/Think-Together.jpg')" alt="Some image" />
          </div>
          <div class="actions">
            <div class="linkarrow">
              <span class="linkarrow-arrow left">
                <span class="shaft"></span>
              </span>
              <span class="main">
                <span class="text">View live</span>
                <span class="linkarrow-arrow right">
                  <span class="shaft"></span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="projects__wrapper-link" :data-index="3" :key="3">
          <div class="description">
            <h1>MyCPE - Mobile application</h1>
            <span>Reverse engineering</span>
            <img :src="require('@/assets/images/cpe.jpg')" alt="Some image" />
          </div>
          <div class="actions">
            <div class="linkarrow">
              <span class="linkarrow-arrow left">
                <span class="shaft"></span>
              </span>
              <span class="main">
                <span class="text">View live</span>
                <span class="linkarrow-arrow right">
                  <span class="shaft"></span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </animated>
    </div>
  </div>
</template>
<script>
import Scene from "@/three/components/hover/scene";

export default {
  mounted() {
    this.hover = new Scene(this.$refs.container, this.$refs.projects);
  },
  methods: {
    href(link) {
      window.open(link, "_blank").focus();
    },
  },
  watch: {
    '$refs.container.clientHeight'() {
      console.log("hello")
    }
  }
};
</script>
<style>
</style>
