<template>
  <component :is="tag" class="container mx-auto px-20">
    <slot />
  </component>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'UiContainer',
  props: {
    tag: VueTypes.string.def('div'),
  },
};
</script>
