<template>
  <!--start: Makhmudov Mirfozil-->
  <span :key="key">
    <span :class="[iconPrefix, iconClass]" />
  </span>
  <!--end: Makhmudov Mirfozil-->
</template>

<script>
// start: Mirfozil Makhmudov
import VueTypes from 'vue-types';

const VARIANT_PREFIX_MAP = {
  solid: 'fas',
  regular: 'far',
  light: 'fal',
  brand: 'fab',
};

const ICON_SETS = {
  'font-awesome': (iconName) => `fa-${iconName}`,
};

export default {
  name: 'UiIcon',
  props: {
    variant: VueTypes.oneOf(Object.keys(VARIANT_PREFIX_MAP)).def('regular'),
    name: VueTypes.string.isRequired,
    set: VueTypes.oneOf(Object.keys(ICON_SETS)).def('font-awesome'),
  },
  computed: {
    // to support dynamic icon changing
    key() {
      return `${this.iconPrefix} ${this.iconClass}`;
    },

    iconPrefix() {
      return VARIANT_PREFIX_MAP[this.variant];
    },

    iconClass() {
      return ICON_SETS[this.set](this.name);
    },
  },
};
// end: Mirfozil Makhmudov
</script>
