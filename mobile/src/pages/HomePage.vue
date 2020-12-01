<template>
  <q-page class="column">
    <div v-if="isLoading" class="row justify-center q-pa-xl">
      <q-spinner size="sm" />
    </div>
    <template v-else>
      <z-ad-carousel :ads="ads" class="q-mt-sm" />
      <section v-if="popularCategories.length" class="q-pa-md col-grow">
        <h4 class="product-group-label q-mb-sm text-weight-bold">
          Популярные категории
        </h4>
        <ul class="row q-col-gutter-x-sm q-col-gutter-y-lg">
          <li
            v-for="category in popularCategories"
            :key="category.id"
            class="col-4 row"
          >
            <z-popular-category-card class="shadow-2" :category="category" />
          </li>
        </ul>
      </section>

      <section v-if="discountedCatalogs.length" class="q-pa-md col-grow">
        <h4 class="product-group-label q-mb-sm text-weight-bold">
          Скидки
        </h4>

        <ul class="row q-col-gutter-x-sm q-col-gutter-y-lg">
          <li
            v-for="catalog in discountedCatalogs"
            :key="catalog.id"
            class="col-6 column"
          >
            <z-catalog-card
              class="col-grow"
              :catalog="catalog"
              :price="{ value: catalog.price, old: catalog.oldPrice }"
              :rating="catalog.rating"
              :reviews-count="catalog.reviewsCount"
              :is-wished="isInWishlist(catalog.element.product.id)"
              :is-in-cart="isInCart(catalog.id)"
              @update:is-wished="updateIsWished(catalog.element.product.id, $event)"
              @update:is-in-cart="updateIsInCart(catalog.id, $event)"
            />
          </li>
        </ul>
      </section>

      <section v-if="popularCatalogs.length" class="q-pa-md col-grow">
        <h4 class="product-group-label q-mb-sm text-weight-bold">
          Хиты продажи
        </h4>
        <ul class="row q-col-gutter-x-sm q-col-gutter-y-lg">
          <li
            v-for="catalog in popularCatalogs"
            :key="catalog.id"
            class="col-6 column"
          >
            <z-catalog-card
              class="col-grow"
              :catalog="catalog"
              :price="{ value: catalog.price, old: catalog.oldPrice }"
              :rating="catalog.rating"
              :reviews-count="catalog.reviewsCount"
              :is-wished="isInWishlist(catalog.element.product.id)"
              :is-in-cart="isInCart(catalog.id)"
              @update:is-wished="updateIsWished(catalog.element.product.id, $event)"
              @update:is-in-cart="updateIsInCart(catalog.id, $event)"
            />
          </li>
        </ul>
      </section>

      <section v-if="popularBrands.length" class="q-pa-md col-grow">
        <h4 class="product-group-label q-mb-sm text-weight-bold">
          Популярные бренды
        </h4>

        <q-scroll-area class="brands-slider" :thumb-style="{ display: 'none' }" horizontal>
          <ul class="row no-wrap q-col-gutter-sm">
            <li v-for="brand in popularBrands" :key="brand.id" class="row">
              <z-brand-card :brand="brand" />
            </li>
          </ul>
        </q-scroll-area>
      </section>
    </template>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@common/api';
import PopularApi from '@common/services/PopularApi';
import ZAdCarousel from '@/components/ZAdCarousel';
import ZPopularCategoryCard from '@/components/ZPopularCategoryCard';
import ZBrandCard from '@/components/ZBrandCard';
import promo1Img from '@/assets/promo-1.png';
import promo2Img from '@/assets/promo-2.jpg';
import ZCatalogCard from '@/components/ZCatalogCard';

export default {
  name: 'HomePage',
  components: {
    ZAdCarousel,
    ZPopularCategoryCard,
    ZBrandCard,
    ZCatalogCard,
  },
  computed: {
    ...mapGetters({
      isInWishlist: 'wishlist/hasItem',
      isInCart: 'cart/hasItem',
    }),

    isLoading() {
      return this.$asyncComputed.ads.updating
        || this.$asyncComputed.popularCategories.updating
        || this.$asyncComputed.discountedCatalogs.updating
        || this.$asyncComputed.popularCatalogs.updating
        || this.$asyncComputed.popularBrands.updating;
    },
  },
  asyncComputed: {
    async ads() {
      return [
        { id: '1', image: promo1Img, link: { name: 'in-development' } },
        { id: '2', image: promo2Img, link: { name: 'in-development' } },
      ];
    },

    async popularCategories() {
      return PopularApi.categories({ count: 3 });
    },

    async discountedCatalogs() {
      const { data: catalogs } = await api.all('catalog', {
        filter: { oldPrice: 'ne:null' },
        include: ['element', 'element.product'],
        page: {
          size: 4,
          number: 1,
        },
      });

      return catalogs;
    },

    async popularCatalogs() {
      return PopularApi.catalogs({
        count: 4,
        options: {
          include: ['element', 'element.product'],
        },
      });
    },

    async popularBrands() {
      return PopularApi.brands({ count: 3 });
    },
  },

  methods: {
    updateIsWished(productId, isWished) {
      if (isWished) {
        this.$store.dispatch('wishlist/addItem', productId);
      } else {
        this.$store.dispatch('wishlist/removeItem', productId);
      }
    },

    updateIsInCart(offerId, isInCart) {
      if (isInCart) {
        this.$store.dispatch('cart/addItem', { offerId });
      } else {
        this.$store.dispatch('cart/removeItem', { offerId });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .product-group-label {
    font-size: 18px;
  }

  .brands-slider {
    width: 100%;
    height: 90px + map_get($space-sm, 'y') * 2;
    padding: map_get($space-sm, 'y') 0;
  }
</style>
