<template>
  <router-link class="brand-card" tag="div" :to="brand.url">
    <img :src="brand.src" :alt="brand.description">
  </router-link>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZBrandCard',
  props: {
    brand: VueTypes.shape({
      src: VueTypes.string.isRequired,
      url: VueTypes.string.isRequired,
      description: VueTypes.string.def('Brand Images Description'),
    }),
  },
};
</script>

<style scoped>
  .brand-card {
    width: 10rem;
    margin: 10px;
    box-shadow: 0 0 10px 1px #ccc;
  }
</style>
