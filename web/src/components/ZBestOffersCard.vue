<template>
  <!-- start: SherzodMangliyev -->
  <div class="px-4 py-2 w-full">
    <div class="flex justify-between">
      <div class="w-1/5 p-2 flex align-center">
        <ui-img :src="image || '/images/Rectangle%20455.png'" :ratio="4 / 3" />
      </div>
      <div class="w-4/5">
        <p class="text-xs">
          {{ description }}
        </p>
        <ui-star-rating size="12" :value="rating" />
        <div class="font-bold">
          {{ formatPrice(price || 250000) }}
        </div>
      </div>
    </div>
    <hr class="mt-2">
  </div>
  <!-- end: SherzodMangliyev 17 lines HTML 29.10.2020 -->
</template>

<script>
// start: SherzodMangliyev
import UiImg from '@/components/ui/UiImg';
import UiStarRating from '@/components/ui/UiStarRating';
import VueTypes from 'vue-types';

export default {
  name: 'ZBestOffersCard',
  components: {
    UiImg,
    UiStarRating,
  },
  props: {
    description: VueTypes.string,
    rating: VueTypes.integer.isRequired,
    price: VueTypes.number.isRequired,
    img: VueTypes.string.isRequired,
  },
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
  },
};
// end: SherzodMangliyev 19 lines JS 29.10.2020
</script>

<style scoped>

</style>
