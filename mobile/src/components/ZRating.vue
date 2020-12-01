<template>
  <div class="flex items-center">
    <div v-if="reviewsCount === 0 || null">
      <p>
        Нет отзывов
      </p>
    </div>
    <div v-else class="flex items-center">
      <q-badge
        :class="classObject"
        text-color="white"
        class="rating-badge q-mr-sm"
      >
        {{ $n(rating, 'decimal') }}
      </q-badge>
      <p v-if="reviewsCount > 0" class="reviews-count">
        {{ $n(reviewsCount, 'humanize') }} отзывов
      </p>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZRating',
  props: {
    rating: VueTypes.number.def(0),
    reviewsCount: VueTypes.number.def(0),
  },
  computed: {
    classObject() {
      return {
        'rating-danger': this.rating < 3,
        'rating-yellow': this.rating < 4 && this.rating >= 3,
        'rating-green': this.rating >= 4,
      };
    },
  },
};
</script>

<style scoped lang="scss">
  .rating-danger {
    background: red;
  }

  .rating-yellow {
    background: $warning;
  }

  .rating-green {
    background: $positive;
  }

  .rating-badge {
    width: 30px;
    height: 15px;
    clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
  }

  .reviews-count {
    font-size: 11px;
    line-height: 13px;
    color: #575757;
  }
</style>
