<template>
  <!-- start|Axrorbek|Nisonboyev|28.10.2020 -->
  <q-card
    class="card column no-wrap full-width"
  >
    <q-card-section class="q-pa-none">
      <div class="relative-position">
        <router-link :to="{ name: 'product', params: { id: product.id } }">
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
        </router-link>

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
    </q-card-section>
    <div
      class="q-pa-sm full-width column col-grow"
    >
      <q-card-section class="q-pa-none">
        <q-item class="column card-header q-px-none q-pb-none q-mb-sm product-name">
          <b class="text-caption">
            {{ product.name }}
          </b>
          <v-clamp tag="p" class="text-grey-7 description" :max-lines="1">
            {{ product.description }}
          </v-clamp>
        </q-item>
      </q-card-section>
      <q-card-section
        class="q-pa-none flex column col-grow"
      >
        <div class="flex column justify-center">
          <p class=" product-price-new text-weight-bolder">
            От: {{ $n(price.min, 'currency') }}
          </p>
          <span
            class="product-price-old"
          >
            До: {{ $n(price.max, 'currency') }}
          </span>
        </div>
        <div class="q-mt-auto card-footer">
          <div class="flex justify-between q-pa-none">
            <z-rating
              :rating="product.rating"
              :reviews-count="product.reviewsCount"
            />
          </div>
        </div>
        <div>
          <z-offers-count :offers-count="product.catalogsCount" />
        </div>
      </q-card-section>
    </div>
  </q-card>
  <!-- end|Axrorbek|Nisonboyev| -->
</template>
<!--70-lines = 70k html-->
<script>
// start|AxrorbekNisonboyev|2020-10-28

import VueTypes from 'vue-types';
import ZOffersCount from '@/components/ZOffersCount';
import ZRating from '@/components/ZRating';

export default {
  name: 'ZProductCard',
  components: {
    ZOffersCount,
    ZRating,
  },
  props: {
    product: VueTypes.object.isRequired,
    price: VueTypes.shape({
      min: VueTypes.number,
      max: VueTypes.number,
    }),
    isWished: VueTypes.bool.def(false),
  },
};
// 12-lines = 24k js
// end|AxrorbekNisonboyev|2020-10-28

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
