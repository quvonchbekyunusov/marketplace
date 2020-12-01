<template>
  <q-btn
    :color="isActive ? 'primary' : 'grey'"
    :label="option.name"
    :disable="isDisabled"
    @click="$emit( 'update:is-active', !isActive)"
  />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZOption',
  props: {
    option: VueTypes.option.isRequired,
    isActive: VueTypes.bool.def(false),
    isDisabled: VueTypes.bool.def(false),
  },
};
</script>
