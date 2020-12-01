<template>
  <q-input
    v-model="context.model"
    v-bind="context.attributes"
    type="tel"
  />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'FQPhoneInout',
  props: {
    context: VueTypes.object.isRequired,
  },
};
</script>
