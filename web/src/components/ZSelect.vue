<template>
  <select class="w-40" name="currency">
    <option>empty</option>
    <option v-for="(option) in options" :key="option.id">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZCurrency',
  props: {
    options: VueTypes.arrayOf(VueTypes.object).isRequired,
  },
};
</script>

<style scoped>

</style>
