<template>
  <button
    class="flex focus:outline-none shadow-md  font-normal rounded-md"
    :class="[
      iconPos,
      padding,
      textColorClass,
      bgColorClass,
      borderColorClass,
      activeBackground,
      cursor
    ]"
    @click="clicked"
  >
    <span v-if="icon" class="self-center">
      <i class="fas" :class="[icon, iconSize, contentMargin]" />
    </span>
    <div class="text-center w-full" :class="textSize">
      {{ title }}
    </div>
  </button>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZButton',
  props: {
    title: VueTypes.string.def(''),
    icon: VueTypes.string.def(null),
    iconPosition: VueTypes.string.def('left'),
    disabled: VueTypes.bool.def(false),
    size: VueTypes.string.def('small'),
    textColor: VueTypes.string,
    borderColor: VueTypes.string,
    bgColor: VueTypes.string.def('white'),
  },
  data() {
    return {
      activeBackground: '',
    };
  },
  computed: {
    textSize() {
      if (this.size === 'small') {
        return 'text-3.5';
      }
      return 'text-lg';
    },
    borderColorClass() {
      if (this.disabled) {
        return 'border-solid border border-gray-400';
      } else if (this.borderColor) {
        return `border-solid border border-${this.borderColor}`;
      }
      return 'border-none';
    },
    textColorClass() {
      if (this.disabled) {
        return 'text-gray-600';
      } else if (this.textColor) {
        return `text-${this.textColor}`;
      }
      return 'text-black ';
    },
    cursor() {
      return this.disabled ? 'cursor-not-allowed' : '';
    },
    bgColorClass() {
      if (this.disabled) {
        return 'bg-gray-300';
      } else if (this.bgColor) {
        return `bg-${this.bgColor}`;
      }
      return 'bg-white';
    },
    iconSize() {
      if (this.size === 'small') {
        return 'text-xs';
      } else if (this.size === 'big') {
        return 'text-lg';
      }
      return 'text-base';
    },
    padding() {
      if (this.size === 'small') {
        return 'px-3 py-2';
      }
      return 'px-4 py-3';
    },
    contentMargin() {
      return 'mx-2';
    },
    iconPos() {
      return this.iconPosition === 'right' ? 'flex-row-reverse' : '';
    },
  },
  created() {
    this.activeBackground = this.borderColor;
  },
  methods: {
    clicked() {
      if (this.disabled) {
        return null;
      }
      return this.$emit('button-clicked');
    },
  },
};
</script>

<style scoped></style>
