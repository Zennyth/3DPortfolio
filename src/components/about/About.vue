<template>
  <div class="about section">
    <h1>About me</h1>

    <h2>Services</h2>
    <div class="about__services">
      <div class="about__services-service">
        <div class="icons">
          <fa :icon="['fa-brands', 'vuejs']"></fa>
          <fa :icon="['fa-brands', 'react']"></fa>
          <fa :icon="['fa-brands', 'sass']"></fa>
        </div>
        <h5>Front-End development</h5>
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
        <h5>Back-End development</h5>
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
        <h5>Artificial intellignece</h5>
        <span
          >I'm not profesionnaly operational on this subject but i'm eager to learn.</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import animations from "@/mixins/animations";

export default {
  mixins: [animations],
  mounted() {},
};
</script>
<style>
</style>
