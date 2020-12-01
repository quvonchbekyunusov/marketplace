<template>
  <div>
    <div class="q-py-md full-width flex items-center justify-around">
      <z-logo />
      <z-search />
    </div>
    <z-ad-carousel class="full-width" :images="images" height="216px" :rounded="false" />
    <div class="q-mt-md flex justify-center">
      <p class="only_today q-px-md full-width q-mb-sm text-weight-bold">
        Только сегодня
      </p>
      <z-product-cart-dumb
        v-for="(item) in product"
        :key="item.name"
        class="card q-mx-sm"
        :product="item"
        :price="price"
        :offers-count="offersCount"
        :reviews-count="reviewsCount"
        :is-in-cart="isInCart"
        :is-wished="isWished"
      />
      <z-ad-carousel class="full-width q-my-md" :images="images" height="80px" :rounded="false" />
      <z-product-cart-dumb
        v-for="(item) in product"
        :key="item.name"
        class="card q-mb-md q-mx-sm"
        :product="item"
        :price="price"
        :offers-count="offersCount"
        :reviews-count="reviewsCount"
        :is-in-cart="isInCart"
        :is-wished="isWished"
      />
      <z-product-cart-dumb
        v-for="(item) in product"
        :key="item.name"
        class="card q-mb-md q-mx-sm"
        :product="item"
        :price="price"
        :offers-count="offersCount"
        :reviews-count="reviewsCount"
        :is-in-cart="isInCart"
        :is-wished="isWished"
      />
    </div>
  </div>
</template>

<script>
import ZProductCartDumb from '@/components/ZProductCartDumb';
import ZAdCarousel from '@/components/ZAdCarousel';
import ZLogo from '@/components/ZLogo';
import ZSearch from '@/components/ZSearch';
import VueTypes from 'vue-types';

export default {
  name: 'MainPage',
  components: {
    ZLogo,
    ZSearch,
    ZAdCarousel,
    ZProductCartDumb,
  },
  props: {
    images: VueTypes.arrayOf(VueTypes.shape({
      src: VueTypes.string.isRequired,
      id: VueTypes.id.isRequired,
      link: VueTypes.arrayOf(VueTypes.shape({ name: VueTypes.string.isRequired })).isRequired,
    }).isRequired).isRequired,
    price: VueTypes.shape({
      min: VueTypes.number.isRequired,
      value: VueTypes.number.isRequired,
      old: VueTypes.number.def(null),
    }).isRequired,
    offersCount: VueTypes.number.def(0),
    reviewsCount: VueTypes.number.def(0),
    product: VueTypes.product.isRequired,
    isWished: VueTypes.bool.def(false),
    isInCart: VueTypes.bool.def(false),
  },
};
</script>

<style scoped>
.only_today {
  font-size: 18px;
}

.card {
  max-width: 165px;
  min-width: 125px;
}

@media (max-width: 360px) {
  .card {
    max-width: 135px;
  }
}
</style>
