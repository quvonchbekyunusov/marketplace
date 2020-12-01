<template>
  <div class="flex" >
    <div class="">
      <h1 class="text-4xl text-center">
        {{ this.getAverageReview() }}
      </h1>
      <UiStarRating :value="this.getAverageReview()" :size=20 increment=0.1 />
      <div>
        <label>Based on {{ this.getAllReviews() }} <br> reviews</label>
      </div>
    </div>
    <div class="w-3/4 ml-6">
      <div>
        <div class="inline-block mr-3">
          5
        </div>
        <div class="w-1/3 h-2 bg-gray-300 inline-block rounded">
          <div class="bg-primary-400  h-2 rounded " :style="{'width': this.setFiveStar() + '%' }" />
        </div>
        <h1 class="inline-block ml-3">
          {{ this.setFiveStar() }}%
        </h1>
      </div>
      <div>
        <div class="inline-block mr-3">
          4
        </div>
        <div class="w-1/3 h-2 bg-gray-300 inline-block rounded">
          <div class="bg-primary-400 h-2 rounded" :style="{'width': this.setFourStar() + '%' }" />
        </div>
        <h1 class="inline-block ml-3">
          {{ this.setFourStar() }}%
        </h1>
      </div>
      <div>
        <div class="inline-block mr-3">
          3
        </div>
        <div class="w-1/3 h-2 bg-gray-300 inline-block rounded">
          <div class="bg-primary-400 h-2 rounded" :style="{'width':this.setThreeStar() + '%' }" />
        </div>
        <h1 class="inline-block ml-3">
          {{ this.setThreeStar() }}%
        </h1>
      </div>
      <div>
        <div class="inline-block mr-3">
          2
        </div>
        <div class="w-1/3 h-2 bg-gray-300 inline-block rounded">
          <div class="bg-primary-400 h-2 rounded" :style="{'width':this.setTwoStar() + '%' }" />
        </div>
        <h1 class="inline-block ml-3">
          {{ this.setTwoStar() }}%
        </h1>
      </div>
      <div>
        <div class="inline-block mr-3">
          1
        </div>
        <div class="w-1/3 h-2 bg-gray-300 inline-block rounded">
          <div class="bg-primary-400 h-2 rounded" :style="{'width':this.setOneStar() + '%' }" />
        </div>
        <h1 class="inline-block ml-3">
          {{ this.setOneStar() }}%
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import UiStarRating from '@/components/ui/UiStarRating';

export default {
  components: {
    UiStarRating,
  },
  props: {
    ratingArr: VueTypes.arrayOf(
      VueTypes.shape({
        fiveStar: VueTypes.number.isRequired,
        fourStar: VueTypes.number.isRequired,
        threeStar: VueTypes.number.isRequired,
        twoStar: VueTypes.number.isRequired,
        oneStar: VueTypes.number.isRequired,
      }),
    ).isRequired,
  },
  data() {
    return {
      allReviews: 0,
    };
  },
  methods: {
    getAllReviews() {
      this.allReviews = this.ratingArr[0].fiveStar + this.ratingArr[0].fourStar
        + this.ratingArr[0].threeStar + this.ratingArr[0].twoStar + this.ratingArr[0].oneStar;
      return this.allReviews;
    },
    getAverageReview() {
      const avarage = Math.round(((5 * this.ratingArr[0].fiveStar + 4 * this.ratingArr[0].fourStar + 3
      * this.ratingArr[0].threeStar
      + 2 * this.ratingArr[0].twoStar + 1 * this.ratingArr[0].oneStar) / this.getAllReviews()) * 10) / 10;
      return avarage;
    },
    setFiveStar() {
      const fsp = Math.round((this.ratingArr[0].fiveStar * 100) / this.getAllReviews());
      return fsp;
    },
    setFourStar() {
      const fsp = Math.round((this.ratingArr[0].fourStar * 100) / this.getAllReviews());
      return fsp;
    },
    setThreeStar() {
      const fsp = Math.round((this.ratingArr[0].threeStar * 100) / this.getAllReviews());
      return fsp;
    },
    setTwoStar() {
      const fsp = Math.round((this.ratingArr[0].twoStar * 100) / this.getAllReviews());
      return fsp;
    },
    setOneStar() {
      const fsp = Math.round((this.ratingArr[0].oneStar * 100) / this.getAllReviews());
      return fsp;
    },
  },
};
</script>

<style scoped>
</style>
