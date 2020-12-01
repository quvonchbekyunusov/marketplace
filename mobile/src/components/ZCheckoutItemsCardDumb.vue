<template>
  <!-- start: Azimjon Toirov 09.10.2020 -->
  <q-card flat class="cart-item-card" square>
    <q-card-section
      class="q-pb-lg q-pr-sm row justify-around"
      horizontal
    >
      <q-card-section class="q-pa-none q-mt-sm row full-width">
        <div class="col-2">
          <q-icon
            v-if="isSoldOut"
            name="fal fa-exclamation-circle"
            size="sm"
            color="red-13"
            class="q-ml-sm q-mt-sm"
          />
        </div>
        <div class="col-10 q-mt-sm">
          <b
            class="text-subtitle1 text-weight-medium ellipsis-2-lines"
            :class="{ 'text-grey--sold': !isSoldOut }"
          >
            {{ productName }}
          </b>
          <span class="text-caption text-grey-6">
            {{ sellerName }}
          </span>
          <slot class="text-caption text-grey-6" :seller="sellerName" />
          <div class="flex items-center">
            <p
              v-if="!isSoldOut"
              class="price"
              :class="!isSoldOut
                ? 'cart-item--price'
                : 'cart-item--sold q-mb-sm'"
            >
              {{ $n(offerPrice, 'currency') }}
            </p>
            <p v-if="!isSoldOut" class="q-mb-xs q-ml-sm text-primary">
              Есть в складе
            </p>
            <span v-if="isSoldOut" class="cart-item--sold">Распродано</span>
          </div>
          <p>Количество: {{ quantity }}</p>
        </div>
      </q-card-section>
      <q-img
        :class="!isSoldOut
          ? 'no-border-radius'
          : 'grayscale'"
        :src="productCartImage"
        class="image"
        ratio="1"
        contain
      />
    </q-card-section>
  </q-card>
  <!-- end: Azimjon Toirov -->
</template>

<script>
// start: Azimjon Toirov 09.10.2020
import VueTypes from 'vue-types';

export default {
  name: 'ZCheckoutItemsCardDumb',
  props: {
    productName: VueTypes.string.isRequired,
    productCartImage: VueTypes.string.isRequired,
    sellerName: VueTypes.string.isRequired,
    isSoldOut: VueTypes.bool.isRequired,
    offerPrice: VueTypes.number.isRequired,
    quantity: VueTypes.integer.isRequired,
  },
};
// end: Azimjon Toirov
</script>

<style lang="scss" scoped>
  // start: Azimjon Toirov
  .cart-item-card {
    width: 100%;
    border-radius: 8px;
    font-size: 12px;
  }

  .cart-item--price {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .cart-item--sold {
    color: #575757;
    font-size: 20px;
  }

  .text-grey--sold {
    color: #575757;
  }

  .image {
    max-width: 33%;
    min-width: 30%;
  }

  .grayscale {
    filter: grayscale(90%);
    border-radius: 0;
  }

  .product-name {
    max-width: 70%;
  }

  .price {
    font-size: 14px;
  }

  // end: Azimjon Toirov
  .deleteBtn {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  }

</style>
