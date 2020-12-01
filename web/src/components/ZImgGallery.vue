<template>
  <!--start: SherzodMangliyev -->
  <div class="flex">
    <div class="w-1/6 flex flex-col">
      <button
        v-for="img in images"
        :key="img"
        class="focus:outline-none"
        @click="imgchoise(img)"
      >
        <ui-img
          :src="img"
          :ratio="16 / 9"
          class="my-1"
        />
      </button>
    </div>
    <div class="w-5/6 flex items-center relative">
      <button class="w-full h-full absolute z-50 focus:outline-none" @click="clicked" />
      <ui-img
        class="cursor-zoom-in"
        :src="mainImage"
        :ratio="4 / 3"
        :contain="true"
      />
    </div>
  </div>
  <!--end: SherzodMangliyev 10 lines HTML 29.10.2020-->
</template>

<script>
// start: SherzodMangliyev
import UiImg from '@/components/ui/UiImg';
import VueTypes from 'vue-types';

export default {
  name: 'ZImgZoom',
  components: {
    UiImg,
  },
  props: {
    images: VueTypes.arrayOf(VueTypes.string),
  },
  data() {
    return {
      mainImage: this.images[0],
      gallery: false,
    };
  },
  methods: {
    imgchoise(img) {
      this.mainImage = img;
    },
    clicked() {
      console.log(this.gallery);
      this.gallery = true;
      console.log(this.gallery);
    },
  },
};
// end: SherzodMangliyev 18 lines JS 29.10.2020
</script>

<style scoped>
  .cursor-zoom-in {
    cursor: zoom-in;
  }
</style>
