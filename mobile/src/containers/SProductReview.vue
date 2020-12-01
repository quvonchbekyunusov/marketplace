<template>
  <!-- start Axrorbek Nisonboyev  -->
  <div>
    <div v-if="isLoading">
      <q-spinner size="sm" />
    </div>
    <div v-else>
      <q-card-section class="flex justify-between q-px-xs">
        <div>
          <z-rating :rating="rating" :reviews-count="reviewsCount" />
        </div>
      </q-card-section>
      <q-scroll-area
        v-if="reviewsCount !== 0"
        horizontal
        style="width: 350px; height: 250px;"
        :thumb-style="thumbStyle"
      >
        <ul class="row q-col-gutter-lg no-wrap">
          <li
            v-for="review in reviews"
            :key="review.id"
            class="row"
          >
            <z-product-review
              :review="review"
              :rating="rating"
              :reviews-count="reviewsCount"
            />
          </li>
        </ul>
      </q-scroll-area>
    </div>
  </div>
  <!-- end Axrorbek Nisonboyev -->
</template>

<script>
import api from '@common/api';
import VueTypes from 'vue-types';
import ZProductReview from '@/components/ZProductReview';
import ZRating from '@/components/ZRating';
import { sumBy, take } from 'lodash-es';

export default {
  name: 'SProductReview',
  components: {
    ZProductReview,
    ZRating,
  },
  props: {
    productId: VueTypes.id.isRequired,
    take: VueTypes.number.def(3),
  },
  data() {
    return {
      filledReviews: null,
      isLoading: true,
      reviews: null,
      reviewsCount: null,
      rating: null,
      users: null,
      thumbStyle: {
        display: 'none',
      },
    };
  },
  watch: {
    reviewsCount: {
      immediate: true,
      handler() {
      },
    },
  },
  // start Axrorbek Nisonboyev

  async created() {
    const { data: reviews } = await api.all('review', {
      filter: {
        product: this.productId,
      },
      include: ['user'],
    });

    this.reviews = take(reviews, this.take);
    this.reviewsCount = reviews.length;
    this.rating = sumBy(reviews, 'rating') / this.reviewsCount;
    this.users = (await api.all('user')).data;
    this.isLoading = false;
  },
};
// end Axrorbek Nisonboyev
</script>
