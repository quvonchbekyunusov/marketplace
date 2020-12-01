<template>
  <q-page class="column">
    <!-- start|AzimjonToirov|2020-10-27 Refactored -->

    <div v-if="productIds.length > 0">
      <div class="row favorites" />
      <ul class="row q-pa-sm">
        <li
          v-for="product in products"
          :key="product.id"
          class="col-6 q-pa-xs row items-stretch"
        >
          <!-- start|AzimjonToirov|2020-10-29 -->
          <z-product-card
            :product="product"
            :price="product.price"
            :is-wished="isInWishlist(product.id)"
            @update:is-wished="updateIsWished(product.id, $event)"
          />
          <!-- end|AzimjonToirov|2020-10-29 3--html -->
        </li>
      </ul>
    </div>
    <!-- end|AzimjonToirov|2020-10-27 Refactored -->
    <z-empty-state
      v-else
      :content="{
        image: require('../assets/emptystate/online_shopping 1.png'),
        ratio: 5 / 3,
        title: 'Ещё не готовы к покупке?',
        body: 'Добавляйте сюда то, что нравится',
      }"
      :btn="{
        label: 'К товарам',
        color: 'primary',
        to: {
          name: 'home'
        }
      }"
      class="absolute-full"
    />
  </q-page>
</template>

<script>
import api from '@common/api';
import { mapGetters } from 'vuex';
import { flatMap, map } from 'lodash-es';
import ZEmptyState from '@/components/ZEmptyState';
import ZProductCard from '@/components/ZProductCard';
import PriceApi from '@common/services/PriceApi';
// import ZProductListCard from '@/components/ZProductListCard';

export default {
  name: 'WishListPageOne',

  components: {
    // ZProductListCard,
    ZEmptyState,
    ZProductCard,
  },

  data() {
    return {
      isLoading: false,
      elementIds: null,
      catalogs: null,
      products: [],
      dialog: false,
    };
  },

  computed: {
    ...mapGetters({
      productIds: 'wishlist/items',
      isInWishlist: 'wishlist/hasItem',
      isInCart: 'cart/hasItem',
    }),
  },
  /* start|AzimjonToirov|10/31/2020 */
  asyncComputed: {
    async products() {
      const { data: products } = await api.all('product', {
        filter: {
          id: this.productIds,
        },
      });

      return Promise.all(
        products.map(async (product) => {
          const cheapestCatalog = await PriceApi.cheapestCatalog({ product: product.id });

          if (!cheapestCatalog) {
            return null;
          }

          const priciestCatalog = await PriceApi.priciestCatalog({ product: product.id });

          if (!priciestCatalog) {
            return null;
          }

          return {
            ...product,
            reviewsCount: await this.fetchReviews(product.id),
            rating: await this.fetchRating(product.id),
            catalogsCount: await this.fetchCatalogsCount(product.id),
            price: {
              min: cheapestCatalog.price,
              max: priciestCatalog.price,
            },
          };
        }),
      );
    },
  },

  async created() {
    await this.$store.dispatch('toolbar/setTitle', 'Моё избранное');
  },

  methods: {
    updateIsWished(productId, isWished) {
      if (isWished) {
        this.$store.dispatch('wishlist/addItem', productId);
      } else {
        this.$store.dispatch('wishlist/removeItem', productId);
      }
    },

    async fetchReviews(productId) {
      const { data: reviews } = await api.all('review', {
        filter: {
          product: productId,
        },
      });
      return reviews.length;
    },

    async fetchRating(productId) {
      const { data: reviews } = await api.all('review', {
        filter: {
          product: productId,
        },
      });

      const ratings = flatMap(reviews, 'rating');
      const ratingsCount = ratings.length;
      return (ratings.reduce((a, b) => a + b, 0)) / ratingsCount;
    },

    async fetchCatalogsCount(product) {
      const { data: elements } = await api.all('element', {
        filter: { product },
        fields: ['id'],
      });

      if (elements.length === 0) {
        return null;
      }

      const { data: catalogs } = await api.all('catalog', {
        filter: { element: map(elements, 'id') },
      });

      /* end|AzimjonToirov|10/29/2020 prices 40-lines js */

      if (catalogs.length === 0) {
        return null;
      }

      return catalogs.length;
    },
  },

  /* end|AzimjonToirov|10/27/2020 Refactored */
};
</script>

<style scoped>
  .favorites {
    font-size: 18px;
    line-height: 21px;
    color: #27AE60;
    border: 1px solid #D1CDCD;
  }
</style>
