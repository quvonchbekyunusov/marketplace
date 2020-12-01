<template>
  <q-option-group
    v-model="context.model"
    v-bind="context.attributes"
    :options="context.options"
    :type="context.type"
  />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'FQOptionsGroup',
  props: {
    context: VueTypes.object.isRequired,
  },
};
</script>

<style scoped>

</style>
