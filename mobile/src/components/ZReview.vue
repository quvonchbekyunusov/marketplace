<template>
  <!-- start Axrorbek Nisonboyev -->
  <div class="">
    <div class="q-pa-md">
      <div class="full-width no-wrap row justify-between items-start">
        <div class="flex no-wrap items-center">
          <q-avatar size="40px">
            <img v-if="review.user.avatar" :src="review.user.avatar" alt="">
            <p v-else>
              {{ review.user.name.charAt(0) }}
            </p>
          </q-avatar>
          <div class="name no-wrap ellipsis-2-lines text-primary q-ml-md">
            {{ review.user.name }}
          </div>
        </div>
        <q-rating
          v-model="review.rating"
          max="5"
          size="sm"
          color="gold"
          icon="star_border"
          icon-selected="star"
          class="q-mr-sm"
          readonly
        />
      </div>
    </div>
    <div class="row q-px-md">
      <p class="text-subtitle2 q-px-md q-pb-sm">
        <v-clamp ellipsis="6" :max-lines="6">
          {{ review.content }}
        </v-clamp>
      </p>
    </div>
    <div class="data text-body2">
      <!--                  {{ review.user.data }}-->
    </div>
  </div>

  <!-- end Axrorbek Nisonboyev -->
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZReview',
  props: {
    review: VueTypes.shape({
      user: VueTypes.shape({
        avatar: VueTypes.string.isRequired,
        name: VueTypes.string.isRequired,
      }),
      content: VueTypes.string.isRequired,
      rating: VueTypes.number.isRequired,
      // date: VueTypes.number.isRequired,
    }),
  },
};
</script>

<style scoped>

  .name {
    width: 100px;
  }
</style>
