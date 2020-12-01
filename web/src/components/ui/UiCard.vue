<template>
  <div
    class="w-full h-auto box-border"
    :class="[isBordered, isFlat, isSquare ]"
  >
    <slot name="section" />
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'UiCard',
  props: {
    flat: VueTypes.bool.def(false),
    square: VueTypes.bool.def(false),
    bordered: VueTypes.bool.def(false),
  },
  computed: {
    isBordered() {
      return this.bordered ? 'rounded border-2 grey-4 border-opacity-25' : '';
    },
    isFlat() {
      return this.flat ? 'shadow-none' : 'bg-white shadow-md';
    },
    isSquare() {
      return this.square ? 'rounded-none' : '';
    },
  },
};
</script>
