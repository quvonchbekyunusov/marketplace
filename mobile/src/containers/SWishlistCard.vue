<template>
  <z-wishlist-card :product="product" :offers-count="offer.length" :price="offer[0].price" @removeItem="removeItem" />
</template>

<script>
import ZWishlistCard from '@/components/ZWishlistCard';
import VueTypes from 'vue-types';

export default {
  name: 'SWishlistCard',
  components: {
    ZWishlistCard,
  },
  props: {
    product: VueTypes.product.isRequired,
    offer: VueTypes.catalog.isRequired,
  },
  methods: {
    removeItem(id) {
      this.$store.dispatch('wishlist/removeItem', id);
    },
  },
};
</script>
