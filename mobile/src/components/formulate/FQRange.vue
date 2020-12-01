<template>
  <q-slider
    v-model="context.model"
    v-bind="context.attributes"
    @blur="context.blurHandler"
  />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'FQRange',
  props: {
    context: VueTypes.object.isRequired,
  },
  created() {
    console.log(this.context);
  },
};
</script>

<style scoped>

</style>
