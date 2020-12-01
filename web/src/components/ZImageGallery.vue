<template>
  <div class="h-screen bg-gray-500 bg-opacity-25 flex flex-col">
    <div class="main-image flex justify-center pt-3">
      <div class="flex items-center mr-32">
        <ui-icon-button
          size="8"
          icon="chevron-left"
          icon-size="5xl"
          icon-color="gray-600"
          :bordered="false"
          @click="prev(prevImage)"
        />
      </div>
      <div class="w-3/5 h-full">
        <img
          :src="mainImage"
          class="w-full h-full"
        >
      </div>
      <div class="flex items-center ml-32">
        <ui-icon-button
          size="8"
          icon="chevron-right"
          icon-color="gray-600"
          icon-size="5xl"
          :bordered="false"
          @click="next(nextImage)"
        />
      </div>
    </div>
    <div class="all-images py-3 flex justify-center">
      <div class="flex w-4/5 justify-center overflow-x-scroll">
        <button
          v-for="image in images"
          :key="image"
          class="mx-2 w-1/6 h-full focus:outline-none"
          @click="imgchoise(image)"
        >
          <img
            :src="image"
            class="h-full"
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZImageGallery',
  components: {},
  props: {
    images: VueTypes.arrayOf(VueTypes.string).isRequired,
  },
  data() {
    return {
      mainImage: this.images[0],
      prevImage: 0,
      nextImage: 1,
    };
  },
  methods: {
    imgchoise(image) {
      const index = this.images.indexOf(image);
      if (index <= this.images.length - 1 && index > 0) {
        this.prevImage = index - 1;
        this.nextImage = index + 1;
        this.mainImage = this.images[index];
      }
    },
    prev(index) {
      if (!(index < 0)) {
        this.mainImage = this.images[index];
        this.prevImage = index - 1;
        this.nextImage = index + 1;
      }
    },
    next(index) {
      if (index < this.images.length) {
        this.mainImage = this.images[index];
        this.prevImage = index - 1;
        this.nextImage = index + 1;
      }
    },
  },
};
</script>

<style scoped>
  .main-image {
    height: 83.3333%;
  }

  .all-images {
    height: 16.6666%;
  }
</style>
