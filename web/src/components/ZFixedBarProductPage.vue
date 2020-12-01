<template>
  <div>
    <div v-for="data in dataList" :key="data.id" class="flex shadow" style="width: 100%; height: 160px">
      <div class="relative mt-6 " style="left: 2%; width: 45%;">
        <div class="inline-block ">
          <img
            :src="data.src"
            style="width: 116px; height: 101px"
            class="rounded "
          >
        </div>
        <div class="inline-block absolute ml-4" style="width:55%">
          <h1 class="font-bold text-xl">{{ trancateStr(data.title, 40) }}</h1>
          <h2 class="inline-block"><ui-star-rating :value=4.7 :size=12 increment=0.1></ui-star-rating></h2>
          <h2 class="inline-block ml-4">4.7</h2>
        </div>
        <div class="absolute bg-black inline-block" style="right:6%; width:1px; height: 6.5rem"></div>
      </div>
      <div class="flex " style="width: 55%">
        <div class="flex " style="width: 150px; margin-top: 2rem" >
          <img
            :src="data.logo"
            style="width: 90px; height: 90px"
            class="rounded"
          >
        </div>
          <div class="flex mt-12 ml-2">
            <div>
              <h1 class="font-bold text-2xl">{{ trancateStr(data.logoTitle, 10 ) }}</h1>
              <h2>Аксессуары</h2>
            </div>
          </div>
          <div class="flex mr-2" style="padding-left: 10%; margin-top: 2.5rem">
            <div class="mr-8">
              <button
                class="bg-primary-500 focus:outline-none text-white text-xl rounded"
                style="width: 110%; height: 80px">Оформить заказ</button>
            </div>
            <div class="">
              <button
                class="focus:outline-none bg-gray-100 rounded"
                      style="width: 80px; height: 80px; padding-left: 5px" >
                <svg style="margin-left: 22px" width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              </button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    dataList: VueTypes.arrayOf(
      VueTypes.shape({
        id: VueTypes.number,
        src: VueTypes.string.isRequired,
        title: VueTypes.string.isRequired,
        logo: VueTypes.string.isRequired,
        logoTitle: VueTypes.string.isRequired,
      }).loose,
    ).isRequired,
  },
  methods: {
    trancateStr(str, num) {
      if (str <= num) {
        return str;
      }
      const str2 = `${str.slice(0, num)}`;
      return str2;
    },
  },
};
</script>
