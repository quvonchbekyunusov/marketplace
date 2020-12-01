<template>
  <!-- //start |Doniyor Raxmonov| 2020-10-29 -->
  <q-card class="row">
    <div class="col">
      <q-img
        :src="product.images[0]"
        native-context-menu
        spinner-size="sm"
        :ratio="4 / 3"
        contain
      >
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg- text-white">
            Cannot load image
          </div>
        </template>
      </q-img>
    </div>
    <div class="col">
      <q-card-section class="q-pa-none">
        <q-item class="column card-header q-px-none q-pb-none q-mb-sm product-name">
          <b class="text-caption">
            {{ product.name }}
          </b>
          <v-clamp tag="p" class="text-grey-7 description" :max-lines="1">
            {{ product.description }}
          </v-clamp>
        </q-item>
        <div class="flex column justify-center">
          <p class=" product-price-new text-weight-bolder">
            От: {{ $n(price.min, 'currency') }}
          </p>
          <span
            class="product-price-old"
          >
            До: {{ $n(price.max, 'currency') }}
          </span>
          <div class="flex justify-between q-pa-none">
            <z-rating
              :rating="product.rating"
              :reviews-count="product.reviewsCount"
            />
          </div>
        </div>
      </q-card-section>

      <q-btn
        flat
        round
        size="md"
        :color="isWished ? 'red': ''"
        :icon="isWished ? 'favorite': 'favorite_border'"
        class="absolute-top-right"
        :class="isWished ? 'wishlist-btn' : 'btn'"
        @click="$emit('update:is-wished', !isWished)"
      />
    </div>
  </q-card>
  <!-- //end |Doniyor Raxmonov | 2020-10-29-->
</template>

<script>
import VueTypes from 'vue-types';
import ZRating from '@/components/ZRating';

export default {
  name: 'ZProductListCard',
  components: {
    ZRating,
  },
  props: {
    product: VueTypes.object.isRequired,
    price: VueTypes.shape({
      min: VueTypes.number,
      max: VueTypes.number,
    }),
  },
  asyncComputed: {
    isLoading() {
      return false;
    },
  },
  computed: {
    isWished() {
      return this.$store.getters['wishlist/hasItem'](this.product.id);
    },
  },
};
</script>

<style lang="scss" scoped>
  $wishlistBg: #eb5757;

  .product-info {
    font-size: 11px;
  }

  .offers-count {
    font-size: 9px;
  }

  .wishlist-btn {
    color: $wishlistBg;
  }
</style>
