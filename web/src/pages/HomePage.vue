<template>
  <fragment>
    <!-- <div class="w-full shadow">
      <z-navbar />
    </div>
    <z-home-nav /> -->
    <div class="carousel-wrapper flex items-center justify-around md:container mx-auto py-3">
      <z-carousel class="w-9/12 h-full" :slides="SliderImages" />
      <div class="border border-black w-2/12 h-full" />
    </div>
    <z-toggle-btn v-model="switch1" @toggle="log" />
  </fragment>
</template>

<script>
// import ZNavbar from '@/components/ZNavbar';
import ZCarousel from '@/components/ZCarousel';
// import ZFooter from '@/components/ZFooter';
// import ZTab from '@/components/ZTab';
import ZToggleBtn from '@/components/ZToggleBtn';
// import ZHomeNav from '@/components/ZHomeNav';

export default {
  name: 'HomePage',
  components: {
    ZCarousel,
    ZToggleBtn,
  },
  data() {
    return {
      value: '',
      quantity: 1,
      SliderImages: [
        {
          id: 1,
          src: 'https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg',
          alt: '',
        },
        {
          id: 2,
          src: 'https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg',
          alt: '',
        },
        {
          id: 3,
          src: 'https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg',
          alt: '',
        },
      ],
      switch1: true,
    };
  },
  methods: {
    log(switch1) {
      console.log(switch1);
    },
    select(e) {
      console.log(e);
    },
    changedMonth(e) {
      const date = e[2].value;
      console.log(date);
    },

  },
};
</script>
<style scoped>
  .carousel-wrapper {
    height: 423px;
  }
</style>
