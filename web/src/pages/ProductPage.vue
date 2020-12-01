<template>
  <div class="md:container mx-auto">
    <div class="grid grid-cols-3 gap-4">
      <div>
        <z-seller-card />
      </div>
      <div>
        <z-seller-card />
      </div>
      <div>
        <z-seller-card />
      </div>
    </div>
    <div class="w-1/3">
      <z-best-offers items="items" offer-title="Лучшие предложения" />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import ZSellerCard from '@/components/ZSellerCard';
import ZBestOffers from '@/components/ZBestOffers';

export default {
  name: 'ProductPage',
  components: {
    ZSellerCard,
    ZBestOffers,
  },
  props: {
    productId: VueTypes.number.isRequired,
  },
};
</script>
