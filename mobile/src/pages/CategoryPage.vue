<template>
  <fragment>
    <q-page class="q-px-sm">
      <div v-if="isLoading">
        <q-spinner
          color="primary"
          class="absolute-center"
          size="lg"
        />
      </div>
      <template v-else class="row q-mt-md">
        <div class="category-header q-my-sm q-mx-auto q-px-md q-py-sm">
          <p class="text-left text-subtitle2">
            {{ category.data.name }}
          </p>
        </div>
        <z-tooled-product-list
          :option-groups="optionGroups"
          :brands="category.data.brands"
          :products="products"
        />
      </template>
    </q-page>
  </fragment>
</template>

<script>
import VueTypes from 'vue-types';
// start: Mirfozil Makhmudov
import { flatMap, uniq } from 'lodash-es';
import ZTooledProductList from '@/components/ZTooledProductList';
import api from '@common/api';
// end: Mirfozil Makhmudov
import { mapActions, mapGetters } from 'vuex';
import PriceApi from '@common/services/PriceApi';

export default {
  name: 'CategoryPage',
  // start: Mirfozil Makhmudov
  components: {
    ZTooledProductList,
  },
  // end: Mirfozil Makhmudov
  props: {
    categoryId: VueTypes.number.isRequired,
  },
  data() {
    return {
      isLoading: true,
      // start: Mirfozil Makhmudov
      optionGroups: [],
      options: [],
      reviews: null,
      // end: Mirfozil Makhmudov
    };
  },
  // start: Mirfozil Makhmudov
  asyncComputed: {
    async category() {
      const { data: category } = await api.one('category', this.categoryId);
      return category;
    },

    async products() {
      let result = [];
      if (this.brandFilters.length === 0) {
        let products = [];
        if (this.optionFilters.length === 0) {
          products = await api.all('product', {
            filter: {
              category: this.categoryId,
            },
          });
        } else {
          products = await api.all('product', {
            filter: {
              category: this.categoryId,
              options: this.optionFilters,
            },
          });
        }
        products = await Promise.all(products.data.map(async (product) => ({
          ...product,
          offer: await this.fetchOffer(product.id),
          reviews: await this.fetchReviews(product.id),
          rating: await this.fetchRating(product.id),
        })));
        products = products.filter(({ offer }) => offer !== null);
        result = products;
      } else {
        let products = [];
        if (this.optionFilters.length === 0) {
          products = await api.all('product', {
            filter: {
              brand: this.brandFilters,
              category: this.categoryId,
            },
          });
        } else {
          products = await api.all('product', {
            filter: {
              brand: this.brandFilters,
              category: this.categoryId,
              options: this.optionFilters,
            },
          });
        }
        products = await Promise.all(products.data.map(async (product) => ({
          ...product,
          offer: await this.fetchOffer(product.id),
          reviews: await this.fetchReviews(product.id),
          rating: await this.fetchRating(product.id),
        })));
        products = products.filter(({ offer }) => offer !== null);
        result = products;
      }
      result.filter(({ offer }) => {
        if (this.priceFilters === null) {
          return true;
        }
        return this.priceFilters.min <= offer.price.value && this.priceFilters.max >= offer.price.value;
      });
      return result;
    },
  },
  // end: Mirfozil Makhmudov
  computed: {
    ...mapGetters({
      isInWishlist: 'wishlist/hasItem',
      isInCart: 'cart/hasItem',
      brandFilters: 'filters/brands',
      priceFilters: 'filters/price',
      optionFilters: 'filters/options',
    }),
  },
  async created() {
    // start: Mirfozil Makhmudov
    this.category = await api.one('category', this.categoryId);
    const optionsIds = uniq(flatMap(this.products, 'options'));
    this.options = await api.multiple('option', optionsIds);
    this.optionGroups = await this.fetchOptionGroups(this.options.data);
    await this.$store.dispatch('toolbar/setTitle', this.category.data.name);
    // end: Mirfozil Makhmudov
    this.isLoading = false;
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('filters/clearBrands');
    this.$store.dispatch('filters/clearPrice');
    this.$store.dispatch('filters/clearOptions');
    next();
  },
  methods: {
    ...mapActions({
      openFilters: 'filters/open',
    }),
    // start: Mirfozil Makhmudov
    async fetchOptionGroups(options) {
      const optionGroupIds = uniq(flatMap(options, 'option-type'));
      let optionGroups = await api.multiple('option-type', optionGroupIds);
      optionGroups = await Promise.all(
        optionGroups.data.map(async (optionGroup) => ({
          ...optionGroup,
          options: await this.fetchOptions(optionGroup.id),
        })),
      );
      return optionGroups;
    },
    async fetchReviews(id) {
      const reviews = await api.all('review', {
        filter: {
          product: id,
        },
      });
      return reviews.data;
    },
    async fetchRating(id) {
      const reviews = await api.all('review', {
        filter: {
          product: id,
        },
      });
      const ratings = flatMap(reviews.data, 'rating');
      const ratingsCount = ratings.length;
      const rating = (ratings.reduce((a, b) => a + b, 0)) / ratingsCount;
      return rating;
    },
    async fetchOptions(optiongroupId) {
      const options = await api.all('option', {
        filter: {
          type: optiongroupId,
        },
      });
      return options.data;
    },
    async fetchOffer(id) {
      const cheapestOffer = await PriceApi.cheapestCatalog({ product: id });

      if (!cheapestOffer) {
        return null;
      }

      return {
        ...cheapestOffer,
        price: {
          value: cheapestOffer.price,
          old: cheapestOffer.oldPrice,
        },
      };
    },
    // end: Mirfozil Makhmudov
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
<style scoped>
  .category-header {
    border-radius: 5px;
    width: 98%;
    background: #fafafa;
  }
</style>
