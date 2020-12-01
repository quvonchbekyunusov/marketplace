<template>
  <!-- start: Azimjon Toirov 09.10.2020 -->
  <q-card flat class="cart-item-card q-mx-auto" square>
    <q-card-section class="q-pa-none q-px-sm">
      <q-card-section class="q-pa-none" horizontal>
        <div class="q-ml-sm q-mt-md">
          <q-img
            :class="!isSoldOut
              ? 'no-border-radius'
              : 'grayscale'"
            :src="productCartImage"
            class="image"
            ratio="1"
            width="120px"
            contain
          />
        </div>
        <div class="q-ml-sm q-mt-md">
          <b
            class="text-subtitle1 text-weight-bold ellipsis-2-lines"
            :class="!isSoldOut ? 'text-grey--sold' : 'text-black'"
          >
            {{ productName }}
          </b>
          <p class="ellipsis-2-lines">
            {{ productDescription }}
          </p>
          <p
            v-if="!isSoldOut"
            class="price text-weight-bold"
            :class="!isSoldOut
              ? 'cart-item--price'
              : 'cart-item--sold q-mb-sm'"
          >
            {{ $n(offerPrice, 'currency') }}
          </p>
          <z-rating :rating="productRating" :reviews-count="reviewsCount" />
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none row q-pb-sm">
        <div class="col-5 flex flex-center">
          <z-input-number
            :min="1"
            :value="quantity"
            @input="onUpdateQuantity"
          />
        </div>
        <div class="col-7">
          <q-btn
            icon="far fa-trash-alt"
            color="grey"
            class="float-right q-mr-sm"
            flat
            dense
            size="md"
            @click="$emit('remove')"
          />
        </div>
        <!-- end: Azimjon Toirov -->
      </q-card-section>
      <!--      <q-card-section class="row full-width">-->
      <!--        <div class="col-2">-->
      <!--          <q-icon-->
      <!--            v-if="isSoldOut"-->
      <!--            name="fal fa-exclamation-circle"-->
      <!--            size="sm"-->
      <!--            color="red-13"-->
      <!--            class="q-ml-sm q-mt-sm"-->
      <!--          />-->
      <!--        </div>-->
      <!--        <div class="col-10 q-mt-sm">-->
      <!--          <span class="text-caption text-grey-6">-->
      <!--            {{ sellerName }}-->
      <!--          </span>-->
      <!--          <slot class="text-caption text-grey-6" :seller="sellerName" />-->
      <!--          <div class="flex items-center">-->
      <!--            <p v-if="!isSoldOut" class="q-mb-xs q-ml-sm text-primary">-->
      <!--              Есть в складе-->
      <!--            </p>-->
      <!--            <span v-if="isSoldOut" class="cart-item&#45;&#45;sold">Распродано</span>-->
      <!--          </div>-->
      <!--          <div class="flex">-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </q-card-section>-->
    </q-card-section>
  </q-card>
</template>

<script>
// start: Azimjon Toirov 09.10.2020
import VueTypes from 'vue-types';
import ZInputNumber from '@/components/ZInputNumber';
import ZRating from '@/components/ZRating';

export default {
  name: 'ZCartItemDumb',
  components: {
    ZInputNumber,
    ZRating,
  },
  props: {
    productName: VueTypes.string.isRequired,
    productCartImage: VueTypes.string.isRequired,
    productDescription: VueTypes.string.isRequired,
    sellerName: VueTypes.string.isRequired,
    isSoldOut: VueTypes.bool.isRequired,
    offerPrice: VueTypes.number.isRequired,
    quantity: VueTypes.integer.isRequired,
    productRating: VueTypes.number.def(0),
    reviewsCount: VueTypes.number.def(0),
  },
  methods: {
    onUpdateQuantity(newQuantity) {
      this.$emit('update:quantity', newQuantity);
    },
  },
};
// end: Azimjon Toirov
</script>

<style lang="scss" scoped>
  .cart-item-card {
    width: 90%;
    min-height: 165px;
    font-size: 12px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16) !important;
    border-radius: 6px !important;
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
</style>
