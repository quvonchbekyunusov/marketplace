<template>
  <z-offer-card :offer="offer" :is-wished.sync="isWished" :is-in-cart.sync="isInCart" :quantity="quantity" />
</template>

<script>
import VueTypes from 'vue-types';
import ZOfferCard from '@/components/ZOfferCard';

export default {
  name: 'SOfferCard',
  components: {
    ZOfferCard,
  },
  props: {
    offer: VueTypes.object.isRequired,
  },
  data() {
    return {
      isWished: this.$store.getters['wishlist/hasItem'](this.offer.product.id),
      isInCart: this.$store.getters['cart/hasItem'](this.offer.id),
      quantity: this.$store.getters['cart/getItemQuantity'](this.offer.id),
    };
  },
  watch: {
    isWished(isWished) {
      if (isWished) {
        this.$store.dispatch('wishlist/addItem', this.offer.product.id);
      } else {
        this.$store.dispatch('wishlist/removeItem', this.offer.product.id);
      }
    },
    isInCart(isInCart) {
      if (isInCart) {
        this.$store.dispatch('cart/addItem', { offerId: this.offer.id });
      } else {
        this.$store.dispatch('cart/removeItem', { offerId: this.offer.id });
      }
    },
    quantity(newQuantity) {
      if (newQuantity <= 0) {
        this.removeFromCart();
      } else {
        this.$store.dispatch('cart/replaceItem', { offerId: this.offer.id, quantity: newQuantity });
      }
    },
  },
};
</script>
