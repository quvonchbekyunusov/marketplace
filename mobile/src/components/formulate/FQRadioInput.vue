<template>
  <q-radio
    v-model="context.model"
    v-bind="context.attributes"
    :options="context.options"
  />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'FQRadioInput',
  props: {
    context: VueTypes.object.isRequired,
  },
};
</script>

<style scoped>

</style>
