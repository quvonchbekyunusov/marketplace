<template>
  <div>
    <div class="row no-wrap items-center q-mb-sm">
      <h6 class="ellipsis q-mr-lg">
        {{ product.name }}
      </h6>
      <q-btn
        :key="isWished ? 'unwish' : 'wish'"
        class="q-ml-auto"
        flat
        :color="isWished ? 'red' : 'grey'"
        size="md"
        round
        :icon="isWished ? 'fas fa-heart' : 'far fa-heart'"
        @click="toggleWishedState"
      />
    </div>
    <q-responsive :ratio="16 / 9">
      <q-carousel
        v-model="currentImage"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        autoplay
        height="auto"
        infinite
      >
        <q-carousel-slide v-for="(image) in product.images" :key="image" :name="image" :img-src="image" />
      </q-carousel>
    </q-responsive>
    <div class="row items-center q-mt-sm">
      <z-rating
        type="star"
        :rating="product.rating"
      />
      <span class="text-body2 q-ml-sm text-grey-5">
        {{ product.rating }}/5
      </span>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import { mapActions } from 'vuex';
import ZRating from '@/components/ZRating';

export default {
  name: 'ZProductHeader',
  components: {
    ZRating,
  },
  props: {
    product: VueTypes.object.isRequired,
  },
  data() {
    return {
      currentImage: this.product.images[0],
      isWished: this.$store.getters['wishlist/hasItem'](this.product.id),
    };
  },
  methods: {
    ...mapActions('wishlist', {
      toggleWishedState(dispatch) {
        dispatch('toggleItem', this.product.id);
        this.isWished = this.$store.getters['wishlist/hasItem'](this.product.id);
      },
    }),
  },
};
</script>
