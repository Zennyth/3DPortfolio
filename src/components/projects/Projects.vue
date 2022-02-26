<template>
  <div class="projects section" ref="container">
    <transition
      appear
      @before-enter="fadeUpIndexOnBeforeEnter"
      @enter="fadeUpIndexOnEnter"
    >
      <h1 :data-index="0">Projects</h1>
    </transition>

    <div class="projects__wrapper" ref="projects">
      <transition-group
        appear
        @before-enter="fadeUpIndexOnBeforeEnter"
        @enter="fadeUpIndexOnEnter"
      >
        <div class="projects__wrapper-link" :data-index="1" :key="1">
          <div class="description">
            <h1>INSEE - TBEF</h1>
            <span>First professionnal project</span>
            <img :src="require('@/assets/images/img1.jpg')" alt="Some image" />
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
        <div class="projects__wrapper-link" :data-index="2" :key="2">
          <div class="description">
            <h1>THINK TOGETHER</h1>
            <span>Etherpad for developers</span>
            <img :src="require('@/assets/images/img1.jpg')" alt="Some image" />
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
            <img :src="require('@/assets/images/img1.jpg')" alt="Some image" />
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
      </transition-group>
    </div>
  </div>
</template>
<script>
import animations from "@/mixins/animations";
import Scene from "@/three/components/hover/scene";

export default {
  mixins: [animations],
  mounted() {
    this.hover = new Scene(this.$refs.container, this.$refs.projects);
  },
};
</script>
<style>
</style>
