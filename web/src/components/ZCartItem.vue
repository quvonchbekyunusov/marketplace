<template>
  <!--start: Makhmudov Mirfozil-->
  <div class="flex">
    <input
      class="mx-2 w-4 h-4"
      type="checkbox"
    >
    <img
      class="w-32 rounded-lg"
      :src="image"
      alt=""
    >
    <div class="flex flex-col justify-around px-5">
      <div class="flex items-center">
        <p class="font-bold text-primary-500">
          {{ sellerName }}
        </p>
        <p
          class="border-l-2 border-gray-600 text-gray-700 font-bold pl-1 ml-1 h-4 flex items-center"
        >
          {{ productName }}
        </p>
      </div>
      <div class="flex">
        <p class="text-gray-700 font-medium">
          Цвет:
        </p>
        <p class="font-bold font-medium">
          {{ color }}
        </p>
        <p class="ml-5 font-medium">
          Цена:
        </p>
        <p class="font-bold font-medium">
          {{ price }} UZS
        </p>
      </div>
      <div class="flex">
        <z-input-number
          :min="1"
          :max="10"
          :value="quantity"
        />
        <z-discount
          class="ml-5"
          :discount="discount"
          :old-price="oldPrice"
        />
      </div>
    </div>
  </div>
  <!--end: Makhmudov Mirfozil-->
</template>

<script>
// start: Mirfozil Makhmudov
import ZInputNumber from '@/components/ZInputNumber';
import ZDiscount from '@/components/ZDiscount';
import VueTypes from 'vue-types';

export default {
  name: 'ZCartItem',
  components: {
    ZInputNumber,
    ZDiscount,
  },
  props: {
    image: VueTypes.string.isRequired,
    sellerName: VueTypes.string.isRequired,
    productName: VueTypes.string.isRequired,
    color: VueTypes.string.isRequired,
    price: VueTypes.number.isRequired,
    oldPrice: VueTypes.number.isRequired,
    quantity: VueTypes.number.isRequired,
  },
  computed: {
    discount() {
      const result = (this.price * 100) / this.oldPrice;
      return result;
    },
  },
};
// end: Mirfozil Makhmudov
</script>
