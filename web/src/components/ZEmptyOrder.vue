<template>
  <div class="flex flex-col w-full">
    <div class="flex items-center justify-center font-bold mb-5">
      <h3 class="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        {{ title }}
      </h3>
    </div>
    <div class="flex items-center justify-center pointer-events-none">
      <img class="max-w-full max-h-full" :src="urlImg" alt="empty_order">
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZEmptyComponent',
  props: {
    title: VueTypes.string.def('Ваш список заказов пуст'),
    urlImg: VueTypes.string.def('../assets/emptyOrder.png'),
  },
};
</script>

<style scoped>

</style>
