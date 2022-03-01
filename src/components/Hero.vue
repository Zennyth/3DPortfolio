<template>
  <div class="hero" id="hero">
    <div class="hero__content">
      <div class="hero__content-title">
        <animated>
          <h5>Mathis Figuet</h5>
        </animated>
        <animated :index="1">
          <h1>
            <span>Engineer </span>
            <span>Full-Stack Developer</span>
          </h1>
        </animated>
      </div>
      <animated :index="2">
        <div class="hero__content-cta">
          <div class="cta__scroll-down"></div>
        </div>
      </animated>
    </div>
  </div>
</template>
<script>
export default {
};
</script>
<style>
</style>
