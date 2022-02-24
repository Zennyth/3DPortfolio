<template>
  <div class="hero section">
    <div class="hero__content">
      <div class="hero__content-title">
        <transition
          appear
          @before-enter="fadeUpIndexOnBeforeEnter"
          @enter="fadeUpIndexOnEnter"
        >
          <h5 :data-index="0">Mathis Figuet</h5>
        </transition>
        <transition
          appear
          @before-enter="fadeUpIndexOnBeforeEnter"
          @enter="fadeUpIndexOnEnter"
        >
          <h1 :data-index="1">
            <span>Engineer </span>
            <span>Full-Stack Developer</span>
          </h1>
        </transition>
      </div>
      <div class="hero__content-cta">
        <div class="cta__scroll-down"></div>
      </div>
    </div>
  </div>
</template>
<script>
import animations from "@/mixins/animations";

export default {
  mixins: [animations],
};
</script>
<style>
</style>
