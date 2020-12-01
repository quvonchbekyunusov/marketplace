<template>
  <router-link :to="to">
    <img :src="src" alt="z-google play" class="w-40">
  </router-link>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZGooglePlay',
  props: {
    src: VueTypes.string.isRequired,
    to: VueTypes.object.isRequired,
  },
};
</script>
