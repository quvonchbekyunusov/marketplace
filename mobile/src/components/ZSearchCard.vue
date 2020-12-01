<template>
  <div class="flex justify-center q-py-lg">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal class="card-size" align="center">
        <div class="flex column justify-center q-mr-md q-ml-md">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            <q-img
              class="col-5 img-size"
              :src="product.images[0]"
              :ratio="4/3"
              width="117px"
            />
          </router-link>
          <q-badge v-if="isDiscounted" class="bagde absolute-top-left" text-color="white" color="red">
            {{ $n(discount, 'percentage') }} <span class="text-uppercase">sale</span>
          </q-badge>
        </div>
        <q-card-section class="full-width column q-pa-xs">
          <div class="flex justify-between no-wrap">
            <p class="text-weight-bold text-size q-pt-sm">
              {{ $n(price.value, 'currency') }}
            </p>
            <q-btn
              flat
              round
              size="md"
              :icon="isWished ? 'favorite' : 'favorite_border'"
              :class="isWished ? 'wishlist-btn' : 'btn' "
              class="q-ma-none q-pa-none"
              color="red"
              @click="$emit('update:is-wished', !isWished)"
            />
          </div>
          <p
            v-if="isDiscounted"
            class="text-strike product-price-old self-start q-pl-lg text-weight-thin text-size-streak"
          >
            {{ $n(price.old, 'currency') }}
          </p>
          <div class="full-width q-pt-md q-mb-sm">
            <z-rating type="badge" size="sm" :rating="rating" :reviews-count="reviewsCount" />
          </div>
          <p class="text-left">
            {{ product.name }}
          </p>
          <q-btn
            class="text-subtitle2 bg-primary text-white q-mt-auto self-end q-ma-sm"
            type="button"
            size="sm"
            @click="$emit('update:is-in-cart', !isInCart)"
          >
            В корзину
          </q-btn>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import ZRating from '@/components/ZRating';

export default {
  name: 'ZSearchCard',
  components: {
    ZRating,
  },
  props: {
    product: VueTypes.product.isRequired,
    rating: VueTypes.number.isRequired,
    reviewsCount: VueTypes.number.isRequired,
    price: VueTypes.shape({
      value: VueTypes.number.isRequired,
      old: VueTypes.number.def(null),
    }),
    isWished: VueTypes.bool.def(false),
    isInCart: VueTypes.bool.def(false),
  },
  data() {
    return {};
  },
  computed: {
    isDiscounted() {
      return this.price.hasOwnProperty('old');
    },
    discount() {
      if (!this.isDiscounted) {
        return 0;
      }

      return (this.price.old - this.price.value) / this.price.old;
    },
  },
};
</script>

<style lang="scss" scoped>

  $color: #575757;
  $wishlistBg: #eb5757;
  $discountBadgeBg: #eb5757;
  $border-radius: 4px;

  .btn-size {
    width: 105px;
    height: 45px;
  }

  .card-size {
    width: 347px;
    height: 180px;

  }

  .text-size {
    font-size: 18px;

  }

  .text-size-streak {
    font-size: 12px;

  }

    .bagde {
      background: $discountBadgeBg;
      padding: 5px;
      font-size: 7px;
      line-height: 1.15;
      border-radius: $border-radius 0;

    }
</style>
