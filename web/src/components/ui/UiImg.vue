<template>
  <z-aspect-ratio
    :class="[widthClassName, heightClassName]"
    :ratio="ratio"
  >
    <div class="w-full h-full" :style="isContain" />
  </z-aspect-ratio>
</template>

<script>
import VueTypes from 'vue-types';
import ZAspectRatio from '@/components/ZAspectRatio';

export default {
  name: 'UiImg',
  components: {
    ZAspectRatio,
  },
  inheritAttrs: false,

  props: {
    src: VueTypes.string.isRequired,
    width: VueTypes.string.def('full'),
    height: VueTypes.string.def('auto'),
    contain: VueTypes.bool.def('false'),
    ratio: VueTypes.oneOfType([VueTypes.number, VueTypes.oneOf(['auto'])]).def('auto'),
  },

  computed: {
    isContain() {
      return this.contain ? `background-size: contain; background-repeat: no-repeat;  background-image: url(${this.src})`
        : `background-size: cover; background-repeat: no-repeat;  background-image: url(${this.src})`;
    },

    widthClassName() {
      return `w-${this.width}`;
    },

    heightClassName() {
      return `h-${this.height}`;
    },
  },
};
</script>
