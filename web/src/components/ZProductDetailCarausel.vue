<template>
  <div>
    <div class="relative ">
      <div class=" absolute" style="margin-top: 85%; transform: translate(-50%,-50%); left: 50%">
        <div
          v-for="(lm, index) in slides"
          :key="index"
          style='display: inline-block'
          @click="roundClicked(index)"
          class="inline-block px-1"
        >
          <img :src="chooseBtn(index)" alt="" width="10px" height="10px"></div>
    </div>
      <img :src="slides[index].src" :style="{width: width + 'px', height: height + 'px' }" :alt="alt"/>
    </div>
  </div>
</template>
<script>
import VueTypes from 'vue-types';

export default {
  props: {
    slides: VueTypes.arrayOf(
      VueTypes.shape({
        id: VueTypes.number.isRequired,
        src: VueTypes.string.isRequired,
        alt: VueTypes.string,
      }).loose,
    ).isRequired,
    width: VueTypes.number.def(271),
    height: VueTypes.number.def(248),
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    roundClicked(i) {
      this.index = i;
    },
    chooseBtn(i) {
      if ((this.index === i)) {
        return 'images/logo-slide-dot-black.svg';
      }
      return 'images/logo-slide-dot.svg';
    },
  },
};
</script>
