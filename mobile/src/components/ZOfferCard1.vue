<template>
  <q-card class="card ">
    <q-card-section class="q-ml-xs flex justify-between full-width items-center">
      <div class="flex column">
        <p class="price font-weight: bold;">
          {{ $n(price.value, 'currency') }}
        </p>
      </div>
      <div>
        <z-rating size="md" type="badge" :rating="rating" :reviews-count="reviewsCount" />
      </div>
    </q-card-section>
    <q-card-section class=" flex justify-between items-center no-padding q-mr-md">
      <p class="text-weight-thin sellerName ellipsis q-ml-md">
        Магазин:<b class="seller">{{ offer.seller.name }}</b>
      </p>
      <q-btn
        :color="isInCart ? 'primary' : 'white'"
        :text-color="isInCart ? 'white' : 'primary'"
        class="btn-size"
        @click="$emit('update:is-in-cart', !isInCart)"
      >
        <p class="text text-capitalize q-pb-md">
          {{ isInCart ? 'В корзине' : 'В корзину' }}
        </p>
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import VueTypes from 'vue-types';
import ZRating from '@/components/ZRating';

export default {
  name: 'ZOfferCard1',
  components: {
    ZRating,
  },
  props: {
    offer: VueTypes.object.isRequired,
    price: VueTypes.shape({
      value: VueTypes.number.isRequired,
      old: VueTypes.number.def(null),
    }).isRequired,
    rating: VueTypes.number,
    reviewsCount: VueTypes.number,
    isInCart: VueTypes.bool.def(false),
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

<style scoped lang="scss">
  .card {
    max-width: 350px;
    min-width: 250px;
    height: 100px;
  }

  .sellerName {
    width: 150px;
  }

  .seller {
    font-size: 18px;
    margin-left: 7px;
  }

  .btn-size {
    height: 30px;
    width: 101px;
    border: 1px solid $primary;
    box-sizing: border-box;
    border-radius: 6px;
  }

  .price {
    font-size: 18px;
    font-weight: bold;
  }

</style>
