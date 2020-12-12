<template>
  <!-- start|AzimjonToirov|2020-10-22 -->
  <div class="w-40 h-48 shadow-md">
    <router-link :to="url || { name: 'about' }">
      <img
        :src="image || 'images/price-card-image.svg'"
        width="full"
        height="32"
      >
      <div class="p-2">
        <p class="font-bold text-base">
          {{ price || '250000' }}
        </p>
        <p class="text-base">
          {{ title || 'Some title here' }}
        </p>
      </div>
    </router-link>
  </div>
  <!-- end|AzimjonToirov|2020-10-22 10lines html -->
</template>

<script>
/* start|AzimjonToirov|10/22/2020 */
import VueTypes from 'vue-types';

export default {
  name: 'ZPriceCard',
  props: {
    price: VueTypes.number,
    title: VueTypes.string,
    image: VueTypes.string,
    url: VueTypes.string,
  },
};
/* end|AzimjonToirov|10/22/2020 10lines js */
</script>
