<template>
  <router-link :to="to">
    <q-img
      :src="img"
      :width="width"
      :height="height"
      :ratio="ratio"
    />
  </router-link>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZAdBanner',
  props: {
    img: VueTypes.string.isRequired,
    to: VueTypes.any.isRequired,
    width: VueTypes.string.def('100%'),
    height: VueTypes.string.def('auto'),
    ratio: VueTypes.number.def(null),
  },
};
</script>
