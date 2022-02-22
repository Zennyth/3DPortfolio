<template>
  <footer class="footer">
    <div class="footer__info">
      <span class="footer__info-date"> Portfolio {{ year }} </span>
      <span class="footer__info-madeBy"> Designed and made by me </span>
    </div>
    <!-- <div>
      <base-button icon round class="btn-facebook">
        <fa :icon="['fab', 'facebook']"></fa>
      </base-button>
      <base-button icon round class="btn-github">
        <fa :icon="['fab', 'github']"></fa>
      </base-button>
      <base-button icon round class="btn-google">
        <fa :icon="['fab', 'google-plus']"></fa>
      </base-button>
    </div> -->
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style>
</style>
