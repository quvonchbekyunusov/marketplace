<template>
  <!--start: Makhmudov Mirfozil-->
  <div
    v-if="discount > 0"
    class="flex justify-center items-center"
  >
    <p class="font-mono font-medium text-gray-700">
      Скидка:
    </p>
    <p class="text-tertiary-500 font-bold">
      {{ discount }}%
    </p>
    <p class="line-through font-bold text-gray-700 ml-5">
      {{ oldPrice }} UZS
    </p>
  </div>
  <!--end: Makhmudov Mirfozil-->
</template>

<script>
// start: Mirfozil Makhmudov
import VueTypes from 'vue-types';

export default {
  name: 'ZDiscount',
  props: {
    discount: VueTypes.number.isRequired,
    oldPrice: VueTypes.number.isRequired,
  },
};
// end: Mirfozil Makhmudov
</script>
