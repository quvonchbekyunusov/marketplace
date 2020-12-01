<template>
  <!--start: Aziz Rozmetov 10/25/2020 -->
  <label class="flex items-center">
    <span class="mr-2">{{ label }}</span>
    <span class="relative text-primary-500">
      <input
        class="
          absolute
          appearance-none
          w-0 h-0
        "
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

const SIZE_CLASSES_MAP = {
  small: 'text-xs',
  normal: 'text-base',
  large: 'text-xl',
};

const COLOR_CLASSES_MAP = {
  primary: 'text-primary-500',
  secondary: 'text-secondary-500',
  tertiary: 'text-tertiary-500',
};

export const SIZES = Object.keys(SIZE_CLASSES_MAP);
export const COLORS = Object.keys(COLOR_CLASSES_MAP);

export const DEFAULT_SIZE = 'normal';
export const DEFAULT_COLOR = 'primary';

export default {
  name: 'ZCheckbox',
  props: {
    value: VueTypes.bool.isRequired,
    label: VueTypes.string.def(''),
    color: VueTypes.oneOf(COLORS).def(DEFAULT_COLOR),
    size: VueTypes.oneOf(SIZES).def(DEFAULT_SIZE),
  },

  computed: {
    icon() {
      if (this.value) {
        return { name: 'check-square', variant: 'solid' };
      }

      return {
        name: 'square',
        variant: 'light',
      };
    },

    checkColor() {
      return COLOR_CLASSES_MAP[this.color];
    },

    checkSize() {
      return SIZE_CLASSES_MAP[this.size];
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
