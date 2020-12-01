<template>
  <flag :iso="country" :squared="squared" />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'UiCountryFlag',
  props: {
    country: VueTypes.string.isRequired,
    squared: VueTypes.bool.def(false),
  },
};
</script>
