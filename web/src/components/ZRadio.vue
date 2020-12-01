<template>
  <!--start: Aziz Rozmetov 10/25/2020 -->
  <label class="flex items-center">
    <span class="mr-2">{{ label }}</span>
    <span class="relative text-primary-500">
      <input
        class="absolute
        appearance-none
        w-0 h-0"
        type="checkbox"
        :checked="value"
        @change="onChange"
      >
      <ui-icon v-bind="icon" :class="[checkColor, checkSize]" />
    </span>
  </label>
  <!--end: Aziz Rozmetov  10/25/2020-->
</template>

<script>
// start: Aziz Rozmetov  10/25/2020
import VueTypes from 'vue-types';

const RADIO_CHECK_MAP = {
  small: 'text-xs',
  normal: 'text-base',
  large: 'text-xl',
};
const RADIO_COLOR_MAP = {
  primary: 'text-primary-500',
  secondary: 'text-secondary-500',
  tertiary: 'text-tertiary-500',
};

export default {
  name: 'ZRadio',
  props: {
    value: VueTypes.bool.isRequired,
    label: VueTypes.string.def(''),
    color: VueTypes.oneOf(Object.keys(RADIO_COLOR_MAP)).def('primary'),
    size: VueTypes.oneOf(Object.keys(RADIO_CHECK_MAP)).def('normal'),
  },

  computed: {
    icon() {
      return this.value
        ? { name: 'circle', variant: 'light' }
        : { name: 'dot-circle', variant: 'solid' };
    },

    checkColor() {
      return RADIO_COLOR_MAP[this.color];
    },

    checkSize() {
      return RADIO_CHECK_MAP[this.size];
    },
  },
  methods: {
    toggle() {
      this.$emit('input', !this.value);
    },

    onChange() {
      this.toggle();
    },
  },
};
// end: Aziz Rozmetov    10/25/2020
</script>
