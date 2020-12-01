<template>
  <!--start: Makhmudov Mirfozil-->
  <div
    class="flex items-center bg-primary-500 text-white w-8 h-4 text-xs badge rounded-sm"
  >
    {{ rating }}
  </div>
  <!--end: Makhmudov Mirfozil-->
</template>

<script>
// start: Mirfozil Makhmudov
import VueTypes from 'vue-types';

export default {
  name: 'ZRatingBadge',
  props: {
    rating: VueTypes.number.isRequired,
  },
};
// end: Mirfozil Makhmudov
</script>

<style scoped>
  /*start: Makhmudov Mirfozil*/
  .badge {
    clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
    padding-left: 6px;
  }

  /*end: Makhmudov Mirfozil*/
</style>
