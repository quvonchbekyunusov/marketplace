<template>
  <!-- start|AzimjonToirov|10/20/2020 -->
  <router-link :to="to" class="flex items-center">
    <img :src="src" alt="z-logo">
  </router-link>
  <!-- end|AzimjonToirov|10/20/2020 2lines -->
</template>

<script>
/* start|AzimjonToirov|10/20/2020 */
import VueTypes from 'vue-types';

export default {
  name: 'ZLogo',
  props: {
    src: VueTypes.string.isRequired,
    to: VueTypes.object.isRequired,
  },
};
/* end|AzimjonToirov|10/20/2020 6lines */
</script>
