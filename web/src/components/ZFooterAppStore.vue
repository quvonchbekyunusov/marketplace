<template>
  <router-link :to="to">
    <img :src="src" alt="z-app store" class="w-40">
  </router-link>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZAppStore',
  props: {
    src: VueTypes.string.isRequired,
    to: VueTypes.object.isRequired,
  },
};
</script>
