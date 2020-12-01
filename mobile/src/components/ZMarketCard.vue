<template>
  <q-card class="my-card q-px-md" flat bordered>
    <div v-if="isLoading" class="flex fit justify-center items-center">
      <q-spinner color="primary" size="lg" />
    </div>
    <template v-else>
      <q-card-section class="row q-pa-none">
        <div class="col-6 justify-around">
          <q-img :src="seller.logo" />
        </div>
        <q-card-section
          vertical
          class="col-6 text-center"
        >
          <b class="card-label text-grey-8 text-weight-bold text-center">
            {{ seller.name }}
          </b>
          <span class="q-pt-sm text-h6 text-grey-8">{{ $n(offer.price, 'currency') }}</span>
        </q-card-section>
        <q-card-section class="q-px-none col-6">
          <z-rating
            type="star"
            :rating="seller.rating"
            name="quality"
            size="1.5em"
          />
        </q-card-section>
        <q-card-section class="col-6 justify-center">
          <q-btn
            v-if="!isQuantityVisible"
            color="primary"
            icon="fas fa-cart-plus"
            class="full-width"
            @click="addToCart"
          />

          <template v-else>
            <div class="row">
              <q-input v-model.number="quantity" type="number" outlined class="col-7" min="1" dense />
              <q-btn
                flat
                size="md"
                class="text-red-9 text-h6 col-5"
                icon="fas fa-shopping-cart"
                @click="removeFromCart"
              />
            </div>
          </template>
        </q-card-section>
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
import VueTypes from 'vue-types';
import api from '@common/api';
import ZRating from '@/components/ZRating';

export default {
  name: 'ZMarketCard',
  components: {
    ZRating,
  },
  props: {
    offer: VueTypes.shape({
      id: VueTypes.string.isRequired,
      product: VueTypes.string.isRequired,
      seller: VueTypes.string.isRequired,
      price: VueTypes.number.isRequired,
    }).loose.isRequired,
  },
  data() {
    return {
      quantity: 0,
      isQuantityVisible: false,
      isLoading: true,
      seller: null,
    };
  },
  async created() {
    this.seller = await api.sellers.one(this.offer.seller);
    this.isLoading = false;
  },
  methods: {
    addToCart() {
      this.isQuantityVisible = true;
      this.quantity = 1;
      this.$store.dispatch('cart/addItem', {
        offerId: this.offer.id,
        quantity: this.quantity,
      });
    },
    removeFromCart() {
      this.isQuantityVisible = false;
      this.quantity = 0;
      this.$store.dispatch('cart/removeItem', {
        offerId: this.offer.id,
      });
    },
  },
};
</script>

<style scoped>
  .card-label {
    font-size: 16px;
  }

  .heighttext {
    height: 30px
  }
</style>
