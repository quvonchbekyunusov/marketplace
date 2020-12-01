<template>
  <q-page>
    <!--start: Makhmudov Mirfozil-->
    <div v-if="isLoading">
      <q-spinner
        color="primary"
        class="absolute-center"
        size="sm"
      />
    </div>
    <!--end: Makhmudov Mirfozil-->
    <div v-else>
      <!-- start|JahongirQudratov|10/15/2020  -->
      <div class="q-px-md">
        <z-single-page-header
          :object="brand"
          :products-count="products.length"
        />
      </div>
      <z-categories-horizontal :categories="categories" />
      <!-- end|JahongirQudratov|10/15/2020 -->
      <!--start: Makhmudov Mirfozil-->
      <z-tooled-product-list
        :products="products"
        :option-groups="optionGroups"
      />
      <!--end: Makhmudov Mirfozil-->
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import VueTypes from 'vue-types';
import api from '@common/api';
import ZSinglePageHeader from '@/components/ZSinglePageHeader';
import { flatMap, uniq } from 'lodash-es';
import PriceApi from '@common/services/PriceApi';
// import ZProductCard from '@/components/ZProductCard';
// import ZFilterDrawer from '@/components/ZFilterDrawer';
// import ZSelectPopular from '@/components/ZSelectPopular';
import ZCategoriesHorizontal from '@/components/ZCategoriesHorizontal';
import ZTooledProductList from '@/components/ZTooledProductList';

export default {
  name: 'BrandPage',
  components: {
    // ZProductCard,
    // ZSelectPopular,
    // ZFilterDrawer,
    ZCategoriesHorizontal,
    ZSinglePageHeader,
    ZTooledProductList,
  },
  props: {
    brandId: VueTypes.id.isRequired,
  },
  data() {
    return {
      displayType: 'grid',
      optionGroups: [],
    };
  },
  computed: {
    ...mapGetters({
      isInWishlist: 'wishlist/hasItem',
      isInCart: 'cart/hasItem',
      // start: Mirfozil Makhmudov
      optionFilters: 'filters/options',
      categoryFilters: 'filters/category',
      // end: Mirfozil Makhmudov
      isDrawerOpen: 'filters/isOpen',
    }),

    isLoading() {
      return this.$asyncComputed.brand.updating || this.$asyncComputed.products.updating;
    },
  },
  async created() {
    // start: Mirfozil Makhmudov
    const { data: categories } = await api.all('category', {
      filter: {
        brands: Number(this.brandId),
      },
    });
    this.categories = categories;
    const optionsIds = uniq(flatMap(this.products, 'options'));
    this.options = await api.multiple('option', optionsIds);
    this.optionGroups = await this.fetchOptionGroups(this.options.data);
    // end: Mirfozil Makhmudov
  },
  asyncComputed: {
    // start: Mirfozil Makhmudov
    async categories() {
      const { data: categories } = await api.all('category', {
        filter: {
          brands: Number(this.brandId),
        },
      });
      return categories;
    },
    // end: Mirfozil Makhmudov
    async brand() {
      return (await api.one('brand', this.brandId)).data;
    },
    // start: Mirfozil Makhmudov
    async products() {
      let result = [];
      if (this.categoryFilters.length === 0) {
        let products = [];
        if (this.optionFilters.length === 0) {
          products = await api.all('product', {
            filter: {
              brand: this.brandId,
            },
          });
        } else {
          products = await api.all('product', {
            filter: {
              brand: this.brandId,
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
              brand: this.brandId,
              category: this.categoryFilters,
            },
          });
        } else {
          products = await api.all('product', {
            filter: {
              brand: this.brandId,
              category: this.categoryFilters,
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
      return result;
    },
    // end: Mirfozil Makhmudov
  },
  methods: {
    ...mapActions({
      setIsDrawerOpen: 'filters/setIsOpen',
    }),
    // filterOffers(offersFunction) {
    //   const filteredOffers = [];
    //   offersFunction.forEach((offer) => {
    //     if (offer.element.product.brand === this.brandId) {
    //       filteredOffers.push(offer);
    //     }
    //   });
    //   return filteredOffers;
    // },
    // start: Mirfozil Makhmudov
    async fetchReviews(id) {
      const reviews = await api.all('review', {
        filter: {
          product: id,
        },
      });
      return reviews.data;
    },
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
    async fetchOptions(optiongroupId) {
      const options = await api.all('option', {
        filter: {
          type: optiongroupId,
        },
      });
      return options.data;
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

    async fetchProducts() {
      // let products = await api.all('product', { filter: { brand: brandId } });
      // const { data: elements } = await api.all('element', {
      //   filter: {
      //     product: map(products, 'id'),
      //   },
      // });
      const { data: offers } = await api.all('catalog');
      // const cheepedOffer = minBy(offers, 'price');
      //
      // products = await Promise.all(products.data.map(async (product) => ({
      //   ...product,
      //   price: {
      //     value: cheepedOffer.price,
      //     old: cheepedOffer.oldPrice,
      //   },
      // })));

      return offers;
    },
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
    // start|AxrorbekNisonboyev|2020-10-09
    // async fetchCategories() {
    //   let { products } = this.cache;
    //   products = groupBy(products.filter((product) => product.brand === this.brandId), 'category');
    //   products = take(orderBy(Object.entries(products).map(([key, value]) => {
    //     const count = value.length;
    //     return {
    //       key,
    //       count,
    //     };
    //   }), ['count'], ['desc']), 5);
    //
    //   const categories = await api.categories.multiple(flatMap(products, (product) => product.key));
    //   return categories;
    // },
    // end|Axrorbek|Nisonboyev
  },
};
</script>
<style>

</style>
