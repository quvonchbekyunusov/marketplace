<template>
  <!-- start Axrorbek Nisonboyev -->
  <q-card class="review shadow-2">
    <z-review
      :review="{
        user: {
          avatar: review.user.avatar,
          name: review.user.name,
        },
        content: review.body,
        rating: review.rating,
      }"
    />
    <!-- end Axrorbek Nisonboyev -->
  </q-card>
</template>

<script>
import VueTypes from 'vue-types';
import ZReview from '@/components/ZReview';

export default {
  name: 'ZProductReview',
  components: {
    ZReview,
  },
  props: {
    review: VueTypes.object.isRequired,
  },
};
</script>

<style scoped>
  .review {
    width: 340px;
  }

  .showBtn {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #7AA0DA;
    background: transparent;
    border: transparent;
    outline: none;
  }

  .reviewsLength {
    background: #E8E8E8;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
    width: 27px;
    height: 27px;
    color: #666666;
  }

  .reviewsBlock {
    border-top: 1px solid #C4C4C4;
    height: 40px;
  }

  .s-area {
    width: 100%;
    height: 224px;
    padding-top: 4px;
  }
</style>
