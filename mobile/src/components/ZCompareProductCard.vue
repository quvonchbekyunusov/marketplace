<template>
  <q-card class="card q-mx-md">
    <q-card-section class="q-pa-none">
      <div class="relative-position">
        <router-link :to="{ name: 'product', params: { id: product.id } }">
          <q-img
            :src="product.images[0]"
            native-context-menu
            spinner-size="sm"
            :ratio="2"
          />
        </router-link>
        <q-badge v-if="isDiscounted" class="bagde absolute-top-left" text-color="white">
          {{ $n(discount, 'percentage') }} <span class="text-uppercase">sale</span>
        </q-badge>
        <q-btn
          flat
          round
          size="md"
          icon="delete"
          class="absolute-top-right btn"
          @click="$emit('delete', product.id)"
        />
      </div>
    </q-card-section>
    <div class="q-pa-sm">
      <q-card-section class="q-pa-none">
        <q-item class="column card-header q-px-none q-pb-none product-name">
          <b class="q-mb-xs text-caption">{{ product.name }}</b>
          <span class="ellipsis-2-lines text-grey-7">{{ product.description }}</span>
        </q-item>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-item class="flex justify-between items-center full-width q-pa-none">
          <div class="flex column">
            <p class="product-price-new text-weight-bold">
              {{ $n(price.value, 'currency') }}
            </p>
            <p class="text-strike product-price-old">
              <span v-if="isDiscounted">{{ $n(price.old, 'currency') }}</span>
            </p>
          </div>
          <q-btn
            flat
            round
            size="md"
            icon="shopping_cart"
            :color="isInCart ? 'primary' : 'grey'"
            @click="$emit('update:is-in-cart', !isInCart)"
          />
        </q-item>
        <z-rating
          class="q-mt-xs"
          :rating="rating"
          :reviews-count="reviewsCount"
        />
      </q-card-section>
    </div>
  </q-card>
</template>

<script>
import VueTypes from 'vue-types';
import deleteIcon from '@/assets/delete.svg';
import ZRating from '@/components/ZRating';

export default {
  name: 'ZCompareProductCard',
  components: {
    ZRating,
  },
  props: {
    price: VueTypes.shape({
      value: VueTypes.number.isRequired,
      old: VueTypes.number.def(null),
    }).isRequired,
    product: VueTypes.object.isRequired,
    rating: VueTypes.number.def(0),
    reviewsCount: VueTypes.number.def(0),
    isInCart: VueTypes.bool.def(false),
  },
  data() {
    return {
      deleteIcon,
    };
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
  $color: #999999;
  $border-radius: 6px;

  .card {
    max-width: 160px;
    border-radius: $border-radius;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    max-height: 255px;
  }

  .card-header {
    border-top: 2px solid rgba(153, 153, 153, 0.1);
    min-height: 0;
  }

  .product-name {
    font-size: 10px;
    line-height: 1;
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

  .product-price-old {
    font-size: 9px;
    line-height: 1.25;
  }

  .product-price-new {
    font-size: 16px;
  }
</style>
