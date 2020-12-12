<template>
  <!--start: SherzodMangliyev -->
  <div>
    <div v-if="gallery" class="flex">
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
        <button
          class="w-full h-full absolute z-50 focus:outline-none"
          @click="showMainImage"
        >
          <ui-img
            class="cursor-zoom-in"
            :src="mainImage"
            :ratio="4 / 3"
            :contain="true"
          />
        </button>
      </div>
    </div>
    <fragment v-else>
      <img
        :src="mainImage"
        alt="Main Image of Gallery"
        class="cursor-zoon-out"
        @click="showMainImage"
      >
    </fragment>
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
      gallery: true,
    };
  },
  methods: {
    imgchoise(img) {
      this.mainImage = img;
    },
    showMainImage() {
      console.log('show main image');
      this.gallery = !this.gallery;
    },
  },
};
// end: SherzodMangliyev 18 lines JS 29.10.2020
</script>

<style scoped>
  .cursor-zoom-in {
    cursor: zoom-in;
  }
  .cursor-zoom-out {
    cursor: zoom-out;
  }
</style>
