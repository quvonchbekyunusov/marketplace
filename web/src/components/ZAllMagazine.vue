<template>
  <div>
    <div class="flex justify-center">
      <div class=" inline-block" style="margin-top: 140px">
        <button
          @click="prevSlide(), dir='slide-left'"
          class="focus:outline-none"
          :class="cursorPrev"
        >
          <img src="images/logo-left-click.svg">
        </button>
      </div>
      <div class="inline-block pl-4 flex justify-center" style="width: 1100px">
        <!-- <z-all-magazine-block
          v-if="(index>=firstIndex) && (index<=secondIndex)"
          class="flex justify-center"
          :allMagazine="allMagazine"
          :next="next"
          :firstIndex="firstIndex"
          :secondIndex="secondIndex"
          :back="back"
          :dir="dir"
        ></z-all-magazine-block> -->
        <z-all-magazine-block
        class="flex justify-center"
        :allMagazine="allMagazine"
        :next="next"
        :firstIndex="firstIndex"
        :secondIndex="secondIndex"
        :back="back"
        :dir="dir"
        />
      </div>
      <div class="inline-block" style="margin-top: 140px">
        <button @click="nextSlide(), dir='slide-right'" class="focus:outline-none" :class="cursorNext">
          <img src="images/logo-right-click.svg">
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import ZAllMagazineBlock from '@/components/ZAllMagazineBlock';
import VueTypes from 'vue-types';

export default {
  components: {
    ZAllMagazineBlock,
  },
  methods: {
    nextSlide() {
      if (this.secondIndex <= (this.allMagazine.length - 2)) {
        this.dir = 'slide-right';
        this.secondIndex += 3;
        this.firstIndex += 3;
        this.cursorPrev = '';
      } else {
        this.cursorNext = 'cursor-not-allowed';
        this.dir = 'slide-left';
      }
    },
    prevSlide() {
      this.dir = 'slide-left';
      if (this.firstIndex >= 3 && this.secondIndex >= 5) {
        this.dir = 'slide-left';
        this.secondIndex -= 3;
        this.firstIndex -= 3;
        this.cursorNext = '';
      } else if ((this.firstIndex === 0) || (this.secondIndex === 2)) {
        this.cursorPrev = 'cursor-not-allowed';
        this.dir = 'slide-right';
      }
    },
  },
  props: {
    // allMagazine: VueTypes.arrayOf,
    allMagazine: VueTypes.arrayOf(
      VueTypes.shape({
        id: VueTypes.number,
        logo: VueTypes.string.isRequired,
        name: VueTypes.string.isRequired,
        title: VueTypes.string.isRequired,
        src1: VueTypes.string.isRequired,
        src2: VueTypes.string.isRequired,
        src3: VueTypes.string.isRequired,
      }),
    ).isRequired,
  },
  data() {
    return {
      cursorNext: '',
      cursorPrev: '',
      dir: '',
      firstIndex: 0,
      secondIndex: 2,
      back: false,
    };
  },
};
</script>
