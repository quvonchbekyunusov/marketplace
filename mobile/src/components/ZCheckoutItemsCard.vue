<template>
  <!-- start: Azimjon Toirov 09.10.2020 -->
  <div class="container">
    <!-- start|AzimjonToirov|2020-10-27 Refactor -->
    <z-checkout-items-card-dumb
      :product-cart-image="offer.element.product.images[0]"
      :product-name="offer.element.product.name"
      :seller-name="seller.name"
      :offer-price="offer.price"
      :is-sold-out="!offer.price > 0"
      :quantity.sync="quantity"
      :selected="false"
      @remove="removeFromCart"
    />
    <!-- end|AzimjonToirov|2020-10-27 Refactor -->
  </div>
  <!-- end: Azimjon Toirov -->
</template>

<script>
// start: Azimjon Toirov 09.10.2020
import VueTypes from 'vue-types';
import ZCheckoutItemsCardDumb from '@/components/ZCheckoutItemsCardDumb';
import api from '@common/api';

export default {
  name: 'ZCheckoutItemsCard',
  components: {
    ZCheckoutItemsCardDumb,
  },
  props: {
    offerId: VueTypes.number.isRequired,
  },
  data() {
    return {
      quantity: this.$store.getters['cart/getItemQuantity'](this.offerId),
      isLoading: true,
      offer: [],
      product: [],
      seller: [],
    };
  },
  watch: {
    quantity: 'onUpdateQuantity',
  },
  async created() {
    /* start|AzimjonToirov|10/27/2020 Refactored */
    const { data: catalog } = await api.one('catalog', this.offerId, {
      include: ['element', 'element.product'],
    });
    const { data: product } = await api.one('product', catalog.element.product.id);
    const { data: seller } = await api.one('seller', catalog.element.product.seller);
    this.offer = catalog;
    this.product = product;
    this.seller = seller;
    this.isLoading = false;
    /* end|AzimjonToirov|10/27/2020 Refactored */
  },
  methods: {
    removeFromCart() {
      this.$q.dialog({
        title: 'Удалить',
        message: 'Вы действительно хотите удалить ?',
        cancel: true,
        color: 'primary',
        persistent: true,
      }).onOk(() => {
        this.$store.dispatch('cart/removeItem', { offerId: this.offerId });
      }).onCancel(() => {
      });
    },
    onUpdateQuantity(newQuantity) {
      this.$store.dispatch('cart/replaceItem', { offerId: this.offerId, quantity: newQuantity });
    },
  },
};
// end: Azimjon Toirov
</script>

<style lang="scss" scoped>
  // start: Azimjon Toirov
  .cart-item-card {
    //width: 100%;
    border-radius: .6rem;
    border-bottom: 1px solid $grey-6;

    .product-image {
      flex-shrink: 0;
    }

    .product-name {
    }
  }

  // end: Azimjon Toirov
</style>
