<template>
  <!--start: Aziz Rozmetov 10/12/2020 -->
  <div class="flex-center justify-center q-py-md">
    <div v-if="isLoading" class="flex flex-center">
      <q-spinner color="primary" />
    </div>
    <z-cart-item-dumb
      v-else
      :product-cart-image="offer.element.product.images[0]"
      :product-description="offer.element.product.description"
      :product-name="offer.element.product.name"
      :product-rating="offer.element.rating"
      :seller-name="seller.name"
      :offer-price="offer.price"
      :is-sold-out="false"
      :quantity.sync="quantity"
      :selected="false"
      @remove="removeFromCart"
    />
  </div>

  <!--end: Aziz Rozmetov  10/12/2020-->
</template>

<script>
import VueTypes from 'vue-types';
import ZCartItemDumb from '@/components/ZCartItemDumb';
import api from '@common/api';

// start: Aziz Rozmetov  10/12/2020
export default {
  name: 'ZCartCard',
  components: {
    ZCartItemDumb,
  },
  props: {
    offerId: VueTypes.number.isRequired,
  },
  data() {
    return {
      quantity: this.$store.getters['cart/getItemQuantity'](this.offerId),
      isLoading: true,
      offer: null,
      product: null,
      seller: null,
    };
  },
  watch: {
    quantity: 'onUpdateQuantity',
  },
  async created() {
    // this.offer = await api.offers.one(this.offerId);
    // this.product = await api.products.one(this.offer.product);
    this.offer = (await api.one('catalog', this.offerId, {
      include: ['element', 'element.product'],
    })).data;
    this.seller = await api.one('seller', this.offer.seller);
    this.isLoading = false;
    console.log('asdasdasdasdasdad', this.seller);
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
// end: Aziz Rozmetov    10/12/2020
</script>
