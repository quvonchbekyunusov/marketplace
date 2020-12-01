<template>
  <div class="full-width full-height">
    <!-- start|AzimjonToirov|12.10.2020 -->
    <div v-if="pageIsReady" class="full-width flex column items-center" style="height: 50vh;">
      <span class="q-mt-auto">
        <q-spinner
          color="primary"
          size="xl"
        />
      </span>
    </div>
    <q-page v-else>
      <!-- //start |Doniyor Raxmonov| 2020-10-27 -->
      <div class="text-black text-h6 q-ml-md q-mt-md">
        <p v-if="categories.length > 2">
          Уточните категорию
        </p>
        <p v-else>
          Категория товара
        </p>
        <p class="text-caption text-grey-7">
          <!--          Найдено {{ products.length }} товаров-->
        </p>
      </div>
      <!-- //end |Doniyor Raxmonov | 2020-10-27-->
      <z-categories-horizontal :categories="categories" />

      <!-- //start |Doniyor Raxmonov| 2020-10-27 -->
      <!--      <q-infinite-scroll :offset="20" @load="onLoad">-->
      <z-grid-list-component
        :products="products"
      />

      <!--        <template v-slot:loading>-->
      <!--          <div class="row justify-center q-my-md">-->
      <!--            <q-spinner-dots color="primary" size="40px" />-->
      <!--          </div>-->
      <!--        </template>-->
      <!--      </q-infinite-scroll>-->
      <!-- //end |Doniyor Raxmonov | 2020-10-27-->
      <!--      <div-->
      <!--        v-for="product in filledProducts"-->
      <!--        :key="product.id"-->
      <!--      >-->
      <!--        <z-product-cart-dumb-->
      <!--          :product="product"-->
      <!--          :price="product.price"-->
      <!--          :rating="product.rating"-->
      <!--          :reviews-count="12"-->
      <!--        />-->
      <!--      </div>-->
      <!--      </q-infinite-scroll>-->
    </q-page>
    <!-- end|AzimjonToirov|12.10.2020 -->
  </div>
</template>

<script>
// start|AzimjonToirov|12.10.2020
import api from '@common/api';
import { map, sumBy, uniqBy } from 'lodash-es';
import VueTypes from 'vue-types';
import ZCategoriesHorizontal from '@/components/ZCategoriesHorizontal';
// import PriceApi from '@common/services/PriceApi';
// start  | Doniyor Raxmonov | 2020-10-30
import ZGridListComponent from '@/components/ZGridListComponent';
// end  | Doniyor Raxmonov | 2020-10-30

export default {
  name: 'SearchPage',
  // start  | Doniyor Raxmonov | 2020-10-30
  components: {
    ZGridListComponent,
    ZCategoriesHorizontal,
  },
  // end  | Doniyor Raxmonov | 2020-10-30
  props: {
    query: VueTypes.string.isRequired,
  },
  data() {
    return {
      categories: null,
      isLoading: false,
    };
  },
  computed: {
    // start  | Doniyor Raxmonov | 2020-10-29
    pageIsReady() {
      return this.$asyncComputed.products.updating;
    },
  },
  // end  | Doniyor Raxmonov | 2020-10-30
  asyncComputed: {
    async products() {
      this.isLoading = true;
      let { data: products } = await api.all('product', {
        filter: {
          name: `like:${this.query}`,
        },
        include: ['category'],
      });
      // start  | Doniyor Raxmonov | 2020-10-30
      this.categories = uniqBy(map(products, 'category'), 'id');
      products = await Promise.all(
        products.map(async (product) => {
          const reviews = await this.getReviewsCount(product.id);
          // const catalogsCount = await this.getCatalogsCount(product.id);
          // const minPrice = (await PriceApi.cheapestCatalog({ product: product.id }));
          // const maxPrice = (await PriceApi.priciestCatalog({ product: product.id }));
          return {
            ...product,
            price: {
              min: 545,
              max: 123,
            },
            catalogsCount: 2,
            reviewsCount: reviews.length,
            rating: sumBy(reviews, 'rating') / reviews.length,
          };
        }),
      );
      this.isLoading = false;
      return products;
    },
  },
  methods: {
    async getReviewsCount(id) {
      const { data: reviews } = await api.all('review', {
        filter: {
          product: id,
        },
      });
      return reviews;
    },
    // end  | Doniyor Raxmonov | 2020-10-30

    // async getCatalogsCount(id) {
    //   const catalogs = (await api.all('catalog', id, {
    //     include: ['element'],
    //   })).data;
    //   console.log(catalogs);
    //   return catalogs.filter((catalog) => catalog.element.product.id === id).length;
    // },
  },
};
// end|AzimjonToirov|12.10.2020
</script>

<style scoped>
  .empty-title {
    font-size: 18px;
    line-height: 1.2;
  }
</style>
