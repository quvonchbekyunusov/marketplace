<template>
  <q-btn
    color="primary"
    :outline="outline"
    :label="option.name"
    @click="toggle"
  />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZOptionToggle',

  props: {
    option: VueTypes.option.isRequired,
    value: VueTypes.bool.def(false),
  },

  computed: {
    outline() {
      return !this.value;
    },
  },

  methods: {
    toggle() {
      this.$emit('input', !this.value);
    },
  },
};
</script>
