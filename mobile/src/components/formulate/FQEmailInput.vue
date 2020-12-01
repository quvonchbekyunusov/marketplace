<template>
  <q-input
    v-model="context.model"
    v-bind="context.attributes"
    type="email"
  />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'FQEmailInput',
  props: {
    context: VueTypes.object.isRequired,
  },
};
</script>
