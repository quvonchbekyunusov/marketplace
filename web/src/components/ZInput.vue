<template>
  <label class="inline-flex">
    <span>{{ label }}</span>
    <input
      class="border-2 outline-none rounded p-1"
      v-bind="$attrs"
      @input="onInput"
      v-on="listeners"
    >
  </label>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZInput',
  inheritAttrs: false,
  props: {
    label: VueTypes.string.def(''),
  },
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners;
      return listeners;
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>
