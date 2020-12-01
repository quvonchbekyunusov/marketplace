<template>
  <!--start: Aziz Rozmetov 10/12/2020 -->
  <q-card class="my-card full-width" flat bordered>
    <q-badge v-if="isDiscounted" class="bagde absolute-top-left" text-color="white" color="red">
      {{ $n(discount, 'percentage') }} <span class="text-uppercase">sale</span>
    </q-badge>
    <q-card-section horizontal class="card-size" align="center">
      <div class="flex items-center justify-center q-mx-md">
        <router-link :to="{ name: 'product', params: { id: product.id } }">
          <q-img
            class="col-5 img-size"
            :src="product.images[0]"
            contain
            :ratio="4/3"
            width="117px"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg- text-white">
                Cannot load image
              </div>
            </template>
          </q-img>
        </router-link>
      </div>

      <div class="row justify-between full-width">
        <q-card-section class="column q-pa-none full-width">
          <div class="row justify-between">
            <div class="column q-pt-lg">
              <v-clamp class="text-left text-weight-bold product-name" max-lines="1">
                {{ product.name }}
              </v-clamp>
              <v-clamp class="text-left text-caption text-weight-regular product-description" max-lines="1">
                {{ product.description }}
              </v-clamp>
            </div>
            <q-btn
              flat
              round
              dense
              size="md"
              :icon="isWished ? 'favorite' : 'favorite_border'"
              :class="isWished ? 'wishlist-btn' : 'btn' "
              class="flex q-mt-sm q-mr-sm q-mb-lg"
              @click="$emit('update:is-wished', !isWished)"
            />
          </div>

          <div class="flex column q-mt-xs">
            <p class="self-start text-weight-bold text-subtitle2">
              {{ $n(price.value, 'currency') }}
            </p>
            <p
              v-if="isDiscounted"
              class="text-caption text-strike product-price-old self-start text-weight-thin"
            >
              {{ $n(price.old, 'currency') }}
            </p>
          </div>
          <div class="flex justify-between q-mb-sm">
            <z-rating type="badge" size="sm" :rating="rating" :reviews-count="reviewsCount" />
            <q-btn
              flat
              round
              size="md"
              icon="shopping_cart"
              :color="isInCart ? 'primary' : 'grey'"
              @click="$emit('update:is-in-cart', !isInCart)"
            />
          </div>
        </q-card-section>
      </div>
    </q-card-section>
  </q-card>
  <!--end: Aziz Rozmetov  10/12/2020-->
</template>

<script>
import VueTypes from 'vue-types';
import ZRating from '@/components/ZRating';
import VClamp from 'vue-clamp';
// start: Aziz Rozmetov  10/12/2020
export default {
  name: 'ZListCard',
  components: {
    ZRating,
    VClamp,
  },
  props: {
    price: VueTypes.shape({
      value: VueTypes.number.isRequired,
      old: VueTypes.number,
    }).isRequired,
    rating: VueTypes.number.def(0),
    reviewsCount: VueTypes.number.def(0),
    product: VueTypes.product.isRequired,
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
// end: Aziz Rozmetov    10/12/2020
</script>

<style lang="scss" scoped>
  /* start: Aziz Rozmetov  10/12/2020*/
  $color: #575757;
  $wishlistBg: #eb5757;
  $discountBadgeBg: #eb5757;
  $border-radius: 4px;

  .btn-size {
    width: 105px;
    height: 45px;
  }

  .card-size {
    height: 155px;

  }

  .text-size {
    font-size: 18px;

  }

  .wishlist-btn {
    color: $wishlistBg;
  }

  .text-size-streak {
    font-size: 12px;

  }

  .btn {
    color: $color;
  }

  .bagde {
    background: $discountBadgeBg;
    padding: 5px;
    font-size: 7px;
    line-height: 1.15;
    border-radius: $border-radius 0;

  }

  .product-description {
    width: 120px;
  }

  .product-name {
    width: 120px;
    font-size: 14px;
  }

  /* end: Aziz Rozmetov   10/12/2020*/
</style>
