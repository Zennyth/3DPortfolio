<template>
  <animated>
    <div class="contact section" id="contact">
      <h1>Let's work together</h1>
      <div class="linkarrow" @click="mail">
        <span class="linkarrow-arrow left">
          <span class="shaft"></span>
        </span>
        <span class="main">
          <span class="text">Email me</span>
          <span class="linkarrow-arrow right">
            <span class="shaft"></span>
          </span>
        </span>
      </div>
    </div>
  </animated>
</template>
<script>

export default {
  mounted() {},
  methods: {
    mail() {
      window.open('mailto:mathis.figuet@orange.fr');
    }
  }
};
</script>
<style>
</style>
