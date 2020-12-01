<template>
  <p class="offers-count text-grey-8">
    {{ $n(offersCount, 'humanize') }} предложений
  </p>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZOffersCount',
  props: {
    offersCount: VueTypes.number.isRequired,
  },
};
</script>

<style scoped>

</style>
