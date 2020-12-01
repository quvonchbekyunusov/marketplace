<template>
  <!-- //start |Doniyor Raxmonov| 2020-10-27 -->
  <q-dialog
    v-model="dialog"
    :maximized="true"
    class="bg-white"
  >
    <div class="bg-white">
      <q-card class="fixed full-width z-max" style="width: 40px">
        <q-icon
          name="arrow_back"
          class="q-ml-md q-my-sm"
          color="grey-8"
          size="md"
          @click="closeDialog"
        />
      </q-card>
      <div class="q-my-lg" style="height: 2%" />
      <q-card v-for="review in allReviews" :key="review.id" class="q-ma-md">
        <z-review
          :review="{
            user:{
              avatar: review.user.avatar,
              name:review.user.name
            },
            content:review.body,
            rating :review.rating
          }"
        />
      </q-card>
    </div>
  </q-dialog>
  <!-- //end |Doniyor Raxmonov| 2020-10-27 -->
</template>

<script>
// start  | Doniyor Raxmonov |  2020-10-27
import VueTypes from 'vue-types';
import api from '@common/api';
import ZReview from './ZReview';

export default {
  name: 'ShowAllReviews',
  components: { ZReview },
  props: {
    dialog: VueTypes.bool.isRequired,
    productId: VueTypes.id.isRequired,
  },
  data() {
    return {
      reviewsForPrint: null,
      productName: null,
      reviews: null,
    };
  },
  asyncComputed: {
    async allReviews() {
      const reviews = await api.all('review', {
        filter: {
          product: this.productId,
        },
        include: ['product', 'user'],
      });
      this.$emit('reviews-count', reviews.length);
      return reviews.data;
    },
  },
  async created() {
    this.productName = (await api.one('product', this.productId)).data;
  },
  methods: {
    closeDialog() {
      this.$emit('dialog-is-closed');
    },
  },
  // start  | Doniyor Raxmonov |  2020-10-27
};
</script>

<style scoped>

</style>
