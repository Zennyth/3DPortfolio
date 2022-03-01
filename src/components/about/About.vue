<template>
  <div class="about section" id="about">
    <animated>
      <h1>About me</h1>
    </animated>

    <animated :index="1">
    <h2>Services</h2>
    <div class="about__services">
      <div class="about__services-service">
        <div class="icons">
          <fa :icon="['fa-brands', 'vuejs']"></fa>
          <fa :icon="['fa-brands', 'react']"></fa>
          <fa :icon="['fa-brands', 'sass']"></fa>
        </div>
        <h5>Front-end development</h5>
        <span
          >I use modern front-end frameworks to create interactive and pleasant
          user experiences.</span
        >
      </div>
      <div class="about__services-service">
        <div class="icons">
          <fa :icon="['fa-brands', 'node']"></fa>
          <fa :icon="['fa-brands', 'python']"></fa>
          <fa :icon="['fa-brands', 'java']"></fa>
        </div>
        <h5>Back-end development</h5>
        <span
          >I design Scalable and secure back-end application/API using popular frameworks.</span
        >
      </div>
      <div class="about__services-service">
        <div class="icons">
          <fa :icon="['fa-brands', 'github']"></fa>
        </div>
        <h5>Devops</h5>
        <span
          >I'm currently learning this subject both on my free time and within my work.</span
        >
      </div>
      <div class="about__services-service">
        <div class="icons">
          <fa :icon="['fa-brands', 'python']"></fa>
        </div>
        <h5>Artificial intelligence</h5>
        <span
          >I'm not professionally operational on this subject, but I'm eager to learn.</span
        >
      </div>
    </div>
    </animated>
  </div>
</template>
<script>
export default {
  mounted() {},
};
</script>
<style>
</style>
