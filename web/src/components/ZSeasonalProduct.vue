<template>
  <fragment>
    <div
      v-for="sp in seasonalProduct"
         :key="sp.id"
         style="width: 730px; height: 210px"
         class="my-6 relative shadow rounded">
      <div class="inline-block">
        <div>
          <img :src="sp.src" style="width: 280px; height: 210px" class="rounded">
        </div>
      </div>
      <div class="absolute inline-block ml-4 mt-4 " style="width: 420px">
        <h3 class="inline-block">{{ sp.name }}</h3>
        <h3 class="float-right inline-block">
          <svg  width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.39941 11.2221C-0.0884311 7.96277 0.74085 3.0738 4.88725 1.44415C9.03366 -0.185504
              11.5215 3.0738 12.3508 4.70346C13.1801 3.0738 16.4972 -0.185504 20.6436 1.44415C24.79
              3.0738 24.79 7.96277 22.3022 11.2221C19.8143 14.4814 12.3508 21 12.3508 21C12.3508 21
              4.88725 14.4814 2.39941 11.2221Z"
              stroke="#3377FF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"/>
          </svg>
        </h3>
        <h1 class="text-2xl font-bold my-2">{{ trancateStr(sp.title, 20) }}</h1>
        <div>
          <h2 class="inline-block" style="color: #FFC804">{{ sp.rate }}</h2>
          <ui-star-rating :value='sp.rate' :size=15 increment=0.1 class="inline-block mx-4"></ui-star-rating>
          <p class="inline-block text-sm">10 отзывов</p>
        </div>
        <p class="text-sm py-1">{{ trancateStr(sp.description, 50) }}</p>
        <div class="mt-2">
          <div class="inline-block">
            <h2 class="text-2xl font-bold">{{ sp.price.toLocaleString() }} som</h2>
          </div>
          <div class="inline-block float-right">
           <button class="focus:outline-none">
             <img src="images/button.svg">
           </button>
          </div>
        </div>
      </div>
     </div>
  </fragment>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    seasonalProduct: VueTypes.arrayOf(
      VueTypes.shape({
        id: VueTypes.number,
        src: VueTypes.string.isRequired,
        name: VueTypes.string.isRequired,
        title: VueTypes.string.isRequired,
        description: VueTypes.string.isRequired,
        rate: VueTypes.number,
        price: VueTypes.number,
      }),
    ).isRequired,
  },
  methods: {
    trancateStr(str, num) {
      if (str <= num) {
        return str;
      }
      const str2 = `${str.slice(0, num)}...`;
      return str2;
    },
  },
};
</script>
