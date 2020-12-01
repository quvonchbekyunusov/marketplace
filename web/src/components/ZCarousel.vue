<template>
  <!--  start: FozilZayn|10/21/2020-->
  <div class="flex relative">
    <div class="flex w-full">
      <transition
        mode="out-in"
        enter-class="opacity-0"
        enter-active-class="transition-opacity duration-200 opacity-100"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="transition-opacity duration-200 opacity-0"
        leave-to-class="opacity-0"
        duration="200"
      >
        <img
          :key="currentSlide.id"
          :src="currentSlide.src"
          :alt="currentSlide.alt"
          class="w-full object-cover"
        >
      </transition>
    </div>

    <div class="absolute flex justify-between w-full h-full px-4 items-end">
      <button
        class="
          focus:outline-none w-4 h-16 flex items-center justify-center
          text-white cursor-pointer opacity-75 text-2xl hover:opacity-100 my-auto
        "
        @click="prev({ stopPrevious: true })"
      >
        &#10094;
      </button>
      <div class="flex justify-around w-3/12">
        <span
          v-for="slide in slides"
          :key="slide.id"
          class="rounded-md w-3 h-3 mb-10"
          :class="currentSlide.id === slide.id ? 'bg-white' : 'border border-white'"
        />
      </div>
      <button
        class="
          focus:outline-none w-4 h-16 flex items-center justify-center text-2xl text-white
          cursor-pointer opacity-75 hover:opacity-100 my-auto
        "
        @click="next({ stopPrevious: true })"
      >
        &#10095;
      </button>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZCarousel',
  props: {
    slides: VueTypes.arrayOf(
      VueTypes.shape({
        id: VueTypes.any.isRequired,
        src: VueTypes.string.isRequired,
        alt: VueTypes.string,
      }).loose,
    ).isRequired,
  },
  data() {
    return {
      timer: null,
      currentIndex: 0,
    };
  },
  computed: {
    currentSlide() {
      return this.slides[this.currentIndex];
    },
  },
  mounted() {
    this.start();
  },
  beforeDestroy() {
    this.stop();
  },
  methods: {
    start() {
      this.timer = setInterval(this.next, 5_000);
    },
    stop() {
      clearInterval(this.timer);
      this.timer = null;
    },
    restart() {
      this.stop();
      this.start();
    },
    next({ stopPrevious = false } = {}) {
      if (stopPrevious) {
        this.restart();
      }
      this.currentIndex += 1;
      if (this.currentIndex === this.slides.length) {
        this.currentIndex = 0;
      }
    },
    prev({ stopPrevious = false } = {}) {
      if (stopPrevious) {
        this.restart();
      }
      this.currentIndex -= 1;
      if (this.currentIndex === -1) {
        this.currentIndex = this.slides.length - 1;
      }
    },
  },
};
</script>
<!-- start: FozilZayn|10/21/2020-->
