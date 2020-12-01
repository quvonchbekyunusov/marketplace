<template>
  <ui-card class="p-4.5 bg-gray-400">
    <template v-slot:section>
      <div class="flex justify-between w-full">
        <div class="w-1/4">
          <ui-img src="/images/Rectangle%20455.png" :ratio="16 / 9" />
        </div>
        <div class="w-3/4">
          <p class="seller-name">
            Mplace
          </p>
          <div class="description md:text-xs">
            Защита экрана №1 в Мире
          </div>
        </div>
      </div>
      <div class="flex w-full h-auto mt-4">
        <div class="w-3/4 flex justify-start">
          <z-img src="/images/Rectangle%20452%20(1).png" :ratio="4 / 3" />
        </div>
        <div class="w-1/4 flex flex-col justify-between">
          <z-img src="/images/Rectangle%20454%20(1).png" :ratio="4 / 3 " />
          <z-img src="/images/Rectangle%20453%20(1).png" :ratio="4 / 3" />
        </div>
      </div>
    </template>
  </ui-card>
</template>

<script>
import UiImg from '@/components/ui/UiImg';

export default {
  name: 'ZSellerCard',
  components: {
    UiImg,
  },
};
</script>
