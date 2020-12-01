<template>
  <!-- start Axrorbek Nisonboyev  -->

  <z-product-cart-dumb
    :product="offer.product"
    :price="offer.price"
    :rating="rating"
    :reviews-count="reviewsCount"
    :is-in-cart="isInCart(offerId)"
    :is-wished="isWished(offer.product.id)"
    @update:is-in-cart="toggleIsInCart(offerId)"
    @update:is-wished="toggleIsWished(offer.product.id)"
  />
  <!-- end Axrorbek Nisonboyev -->
</template>

<script>
import { mapGetters } from 'vuex';
import { filter, sumBy } from 'lodash-es';
import VueTypes from 'vue-types';
import ZProductCartDumb from '@/components/ZProductCartDumb';
import api from '@common/api';
// start Axrorbek Nisonboyev

export default {
  name: 'SProductCardDumb',
  components: {
    ZProductCartDumb,
  },
  props: {
    offerId: VueTypes.id.isRequired,
  },
  data() {
    return {
      offer: null,
      rating: null,
      reviewsCount: null,
    };
  },
  computed: {
    ...mapGetters({
      isWished: 'wishlist/hasItem',
      isInCart: 'cart/hasItem',
    }),
  },
  watch: {
    offerId: {
      async handler(offerId) {
        this.offer = await this.fetchOffer(offerId);
        const reviews = await this.fetchOfferReviews(offerId);
        this.reviewsCount = reviews.length;
        this.rating = sumBy(reviews, 'rating') / this.reviewsCount;
      },

      immediate: true,
    },
  },
  methods: {
    async fetchOffer(offerId) {
      const offer = await api.offers.one(offerId);
      offer.product = await api.products.one(offer.product);
      return offer;
    },

    async fetchOfferReviews(offerId) {
      return filter(await api.reviews.all(), ['offer', offerId]);
    },

    toggleIsInCart(offerId) {
      if (this.isInCart(offerId)) {
        this.$store.dispatch('cart/removeItem', { offerId });
      } else {
        this.$store.dispatch('cart/addItem', { offerId });
      }
    },

    toggleIsWished(productId) {
      if (this.isWished(productId)) {
        this.$store.dispatch('wishlist/removeItem', productId);
      } else {
        this.$store.dispatch('wishlist/addItem', productId);
      }
    },
  },
};
// end Axrorbek Nisonboyev
</script>
