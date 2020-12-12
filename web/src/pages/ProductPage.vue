<template>
<<<<<<< HEAD
  <h1>this is product page</h1>
</template>

<script>

=======
  <div class="md:container mx-auto">
    <div class="ml-3">
        <z-product-detail />
    </div>
    <div class="grid grid-cols-3 gap-4">
        <z-seller-card />
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
import ZProductDetail from '@/components/ZProductDetail';

export default {
  name: 'ProductPage',
  components: {
    ZSellerCard,
    ZBestOffers,
    ZProductDetail,
  },
  props: {
    productId: VueTypes.number.isRequired,
  },
};
>>>>>>> 4f45d189cfab981b66a761dc2dd3866fb6ada440
</script>
