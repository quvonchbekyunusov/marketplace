<template>
  <div class="full-width q-pa-md">
    <z-cart-card v-for="{ offerId } in items" :key="offerId" class="q-mb-md" />
    <span class="block text-right">
      <b>Итого : </b>{{ $n(totalPrice, 'currency') }}
    </span>
  </div>
</template>

<script>
import api from '@common/api';
import { mapGetters } from 'vuex';
import ZCartCard from '@/components/ZCartCard';

export default {
  name: 'ZCartItems',
  components: {
    ZCartCard,
  },
  data() {
    return {
      totalPrice: 0,
    };
  },
  computed: mapGetters('cart', ['items']),
  watch: {
    items: {
      selectOption: 'updateOffers',
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async updateOffers() {
      this.isLoading = true;
      if (!this.offers || this.offers.length !== this.items.length) {
        this.offers = await Promise.all(this.items.map(async ({ offerId }) => api.offers.one(offerId)));
      }
      this.totalPrice = this.calcTotalPrice();
      this.isLoading = false;
    },
    calcTotalPrice() {
      return this.offers.reduce((total, { id, price }) => total + price * this.$store.getters['cart/getItemQuantity'](id), 0);
    },
  },
};
</script>
