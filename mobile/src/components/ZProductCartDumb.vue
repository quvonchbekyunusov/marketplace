<template>
  <!-- start Axrorbek Nisonboyev  -->
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

        <q-badge v-if="isDiscounted" class="badge absolute-top-left" text-color="white">
          {{ $n(discount, 'percentage') }} <span class="text-uppercase">sale</span>
        </q-badge>

        <q-btn
          flat
          round
          size="md"
          :icon="isWished ? 'favorite' : 'favorite_border'"
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
          <b class="text-caption">{{ product.name }}</b>
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
            {{ $n(price.value, 'currency') }}
          </p>
          <div>
            <span
              v-if="isDiscounted"
              class="text-strike product-price-old"
            >
              {{ $n(price.old, 'currency') }}
            </span>
          </div>
        </div>
        <div class="q-mt-auto card-footer">
          <div class="flex justify-between q-pa-none">
            <z-rating
              :rating="rating"
              :reviews-count="reviewsCount"
            />
            <q-btn
              flat
              round
              size="md"
              icon="shopping_cart"
              :color="isInCart ? 'primary' : 'grey'"
              @click="$emit('update:is-in-cart', !isInCart)"
            />
          </div>
        </div>
      </q-card-section>
    </div>
  </q-card>

  <!-- end Axrorbek Nisonboyev -->
</template>

<script>
import VueTypes from 'vue-types';
import ZRating from '@/components/ZRating';
// start Axrorbek Nisonboyev

export default {
  name: 'ZProductCartDumb',
  components: {
    ZRating,
  },
  props: {
    price: VueTypes.shape({
      value: VueTypes.number.isRequired,
      old: VueTypes.number,
    }).isRequired,
    rating: VueTypes.number.def(0),
    reviewsCount: VueTypes.number.def(0),
    product: VueTypes.object.isRequired,
    isWished: VueTypes.bool.def(false),
    isInCart: VueTypes.bool.def(false),
  },
  computed: {
    isDiscounted() {
      return !!this.price.old;
    },
    discount() {
      if (!this.isDiscounted) {
        return 0;
      }

      return (this.price.old - this.price.value) / this.price.old;
    },
  },
};
// end Axrorbek Nisonboyev

</script>

<style lang="scss" scoped>
  $color: #575757;
  $wishlistBg: #eb5757;
  $discountBadgeBg: #eb5757;
  $border-radius: 4px;

  .card {
    border-radius: $border-radius;
    overflow: hidden;
    min-height: 254px;

  }

  .card-header {
    border-top: 2px solid rgba(153, 153, 153, 0.1);
    min-height: 0;
  }

  .badge {
    background: $discountBadgeBg;
    padding: 5px;
    font-size: 7px;
    line-height: 1.15;
    border-radius: $border-radius 0;
  }

  .product-name {
    font-size: 10px;
    line-height: 1;
  }

  .card-footer {
    height: 35px;
  }

  .description {
    font-size: 11px;
    line-height: 1.1;
  }

  .offer-label {
    color: $color;
    font-size: 7px;
    line-height: 1.15;
    padding: 2px;
  }

  .btn {
    color: $color;
  }

  .wishlist-btn {
    color: $wishlistBg;
  }

  .product-price-new {
    font-size: 12px;
    line-height: 14px;
  }

  .product-price-old {
    font-size: 11px;
    line-height: 0;
  }
</style>
