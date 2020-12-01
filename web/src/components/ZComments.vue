<template>
  <div>
    <div>
      <div class="">
        <div class="inline-block ">
          <img :src="review[0].user.avatar" width="55px" height="55px">
        </div>
        <div class="inline-block">
          <div class="inline-block ml-2">
            <h1 style="font-weight: bold">{{ this.review[0].user.name }}</h1>
          </div>
          <div class="inline-block mx-4">
            <h2>{{ this.review[0].date.day }} {{ this.review[0].date.month }} {{ this.review[0].date.year }}</h2>
          </div>
          <div class="inline-block">
            <ui-star-rating :value="review[0].rating" :size="20" increment="0.1"></ui-star-rating>
          </div>
        </div>
      </div>
      <div style="width: 415px" class="ml-6  border-l-2 border-gray-300">
        <p class="ml-6 pt-4">{{ this.review[0].body }}</p>
        <div class="ml-8 mt-6">
          <div class="inline-block">
            <button class="w-16 pl-2 rounded-2xl focus:outline-none bg-gray-100 cursor-not-allowed">
              <img src="images/logo-like.svg" class="inline-block"/>
              <h1 class="inline-block pl-3">9</h1></button>
          </div>
          <div class="inline-block mx-6">
            <button class="w-16 pl-2 rounded-2xl focus:outline-none bg-gray-100 cursor-not-allowed">
              <img src="images/logo-dislike.svg" class=" inline-block" />
              <h1 class="inline-block pl-3">1</h1></button>
          </div>
          <div class="inline-block">
            <button class="focus:outline-none cursor-not-allowed"><h3 class=" text-primary-500" >ответить</h3></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    review: VueTypes.arrayOf(
      VueTypes.shape({
        rating: VueTypes.number.isRequired,
        body: VueTypes.string.isRequired,
        user: {
          avatar: VueTypes.string.isRequired,
          name: VueTypes.string.isRequired,
        },
        date: {
          day: VueTypes.number.isRequired,
          month: VueTypes.string.isRequired,
          year: VueTypes.number.isRequired,
        },
      }),
    ).isRequired,
  },
};
</script>
