<template>
  <!-- start|AzimjonToirov|2020-10-23 -->
  <button
    :class="classes"
    @click="onClick"
  >
    <ui-icon :class="iconClasses" v-bind="iconProps" />
  </button>
  <!-- end|AzimjonToirov|2020-10-23 3lines html -->
</template>

<script>
/* start|AzimjonToirov|10/23/2020 */
import VueTypes from 'vue-types';

export default {
  name: 'UiIconButton',
  props: {
    icon: VueTypes.oneOfType([
      VueTypes.object,
      VueTypes.string,
    ]).isRequired,

    iconColor: VueTypes.string.def('black'),
    iconSize: VueTypes.string.def('3xl'), // tailwind typography properties
    size: VueTypes.string.isRequired, // tailwind width height properties
    bordered: VueTypes.bool.def(false),
  },

  computed: {
    iconProps() {
      if (typeof this.icon === 'string') {
        return {
          name: this.icon,
        };
      }

      return this.icon;
    },

    iconClasses() {
      return [`text-${this.iconColor}`, `text-${this.iconSize}`];
    },

    classes() {
      return [...this.defaultClasses, ...this.sizeClasses, ...this.borderClasses];
    },

    defaultClasses() {
      return ['rounded-full', 'flex', 'items-center', 'justify-center'];
    },

    sizeClasses() {
      return [`w-${this.size}`, `h-${this.size}`];
    },

    borderClasses() {
      return this.bordered ? ['border', 'border-primary-400'] : [];
    },
  },

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
/* end|AzimjonToirov|10/23/2020 29js */
</script>

<style scoped>
  /* start|AzimjonToirov|10/23/2020 */
  button:focus {
    outline: none;
  }

  /* end|AzimjonToirov|10/23/2020 2css */
</style>
