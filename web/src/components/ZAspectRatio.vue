<template>
  <div class="relative">
    <div class="overflow-hidden">
      <div :style="ratioStyle" />
      <div class="absolute inset-0">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZAspectRatio',
  props: {
    ratio: VueTypes.oneOfType([VueTypes.number, VueTypes.oneOf(['auto'])]).isRequired,
  },
  computed: {
    ratioStyle() {
      if (this.ratio === 'auto') {
        return null;
      }

      return {
        paddingBottom: `${(1 / this.ratio) * 100}%`,
      };
    },
  },
};
</script>

<style scoped>

</style>
