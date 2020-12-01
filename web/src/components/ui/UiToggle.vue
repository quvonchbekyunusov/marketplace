<template>
  <!-- start:Turdialiev Bekhzod-22/10/2020 -->
  <label class="inline-flex items-center justify-center relative w-10 h-6">
    <input
      class="hidden"
      type="checkbox"
      name="toggle"
      :disabled="disabled"
      :checked="value"
      @change="toggleValue"
    >
    <div
      class="w-12 h-6 border rounded-3xl transform select-none"
      :class="[bgColorClass,bgBorderClass]"
    />
    <div
      class="w-4 h-4 border rounded-full text-xl absolute rounded-full transform transition-transform duration-200 ease"
      :class="[positionClass,knobColorClass,knobBorderClass]"
    />
  </label>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  model: {
    prop: 'value',
    event: 'toggled',
  },
  name: 'UiToggle',
  props: {
    bgColor: VueTypes.string.def('primary-500'),
    knobColor: VueTypes.string.def('gray-200'),
    disabled: VueTypes.bool.def(false),
    value: VueTypes.bool.def(false),
  },
  computed: {
    bgColorClass() {
      if (this.disabled) {
        return 'bg-gray-300';
      } else if (this.value) {
        if (this.bgColor) {
          return `bg-${this.bgColor}`;
        }
      }
      return 'bg-gray-100';
    },
    knobColorClass() {
      if (this.disabled) {
        return 'bg-gray-600';
      } else if (this.value) {
        if (this.knobColor) {
          return `bg-${this.knobColor}`;
        }
      }
      return 'bg-gray-500';
    },
    positionClass() {
      if (this.value) {
        return 'translate-x-2';
      }
      return '-translate-x-2';
    },
    bgBorderClass() {
      if (this.disabled) {
        return 'border-gray-300';
      } else if (!this.value) {
        return 'border-gray-400';
      }
      return `border-${this.bgColor}`;
    },
    knobBorderClass() {
      if (this.value) {
        return 'border-gray-400';
      }
      return 'border-gray-400';
    },
  },
  methods: {
    toggleValue() {
      this.$emit('toggled', !this.value);
    },
  },
};
/*  end:Turdialiev Bekhzod-23/10/2020 */
</script>
