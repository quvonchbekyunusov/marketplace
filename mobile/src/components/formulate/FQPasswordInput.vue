<template>
  <q-input
    v-model="context.model"
    v-bind="context.attributes"
    type="password"
  />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'FQPasswordInput',
  props: {
    context: VueTypes.object.isRequired,
  },
};
</script>
