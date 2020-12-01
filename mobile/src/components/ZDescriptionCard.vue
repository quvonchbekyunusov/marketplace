<template>
  <div class="q-pa-md q-my-sm shadow-1">
    <p>{{ description }}</p>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZDescriptionCard',
  props: {
    description: VueTypes.string,
  },
};
</script>

<style scoped>

</style>
