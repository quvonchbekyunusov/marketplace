<template>
  <q-page>
    <div v-if="isLoading" class="row justify-center q-pa-xl">
      <q-spinner size="sm" color="primary" />
    </div>
    <div v-else>
      <div>
        <q-carousel
          v-model="slide"
          animated
          infinite
          swipeable
          height="250px"
        >
          <q-carousel-slide
            v-for="(image,index) in product.images"
            :key="image"
            :name="index"
            class="overflow-hidden q-pa-none"
          >
            <q-img :src="image" width="100%" height="250px" :ratio="4 / 3" contain />
          </q-carousel-slide>
        </q-carousel>
        <div class="row justify-center q-mb-sm">
          <q-btn-toggle
            v-model="slide"
            flat
            dense
            size="4px"
            toggle-color="primary"
            color="grey-5"
            :options="product.images.map((_, index) => ({ value: index, icon: 'fas fa-circle' }))"
          />
        </div>
        <div class="absolute-right q-ma-md">
          <q-btn
            round
            flat
            :icon="isWished(productId) ? 'o_favorite' : 'favorite_border'"
            :color="isWished(productId) ? 'red' : ''"
            @click="onWish"
          />
        </div>
      </div>

      <q-card class=" q-pa-md q-mx-md q-mb-md">
        <z-product-info
          class="full-width"
          :infos="{
            name: product.name,
            brand: {
              name: product.brand.name,
              logo: product.brand.logo,
            },
            salesCount: salesCount,
          }"
          :price="{
            min: product.minPrice,
            max: product.maxPrice,
          }"
          :total-rating="rating"
          :reviews-count="reviewsCount"
        />
      </q-card>
      <q-card class="q-mx-md q-pa-md">
        <v-clamp tag="p" :max-lines="10" ellipsis="1">
          {{ product.description }}
        </v-clamp>
      </q-card>
      <div class="q-ma-md">
        <z-option-types-toggle
          v-model="selectedOptions"
          :option-types="optionTypes"
          is-multi
        />
      </div>
      <div class="q-mx-md q-mb-md">
        <s-product-review
          :product-id="productId"
        />
      </div>
      <div
        class="q-ma-md"
      >
        <q-item class="q-px-none">
          <h6 class="flex column">
            <span class="text-h6 text-bold">Магазины с таким же продуктом</span>
            <span class="text-subtitle1">
              {{ filteredCatalogs.length }} предложений
            </span>
          </h6>
        </q-item>

        <z-offer-card
          v-for="catalog in filteredCatalogs"
          :key="catalog.id"
          :offer="catalog"
          :price="{
            value: catalog.price,
            old: catalog.oldPrice
          }"
          :is-in-cart="isInCart(catalog.id)"
          class="q-mb-md"
          @update:is-in-cart="updateIsInCart(catalog.id, $event)"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import VueTypes from 'vue-types';
import ZProductInfo from '@/components/ZProductInfo';
import ZOfferCard from '@/components/ZOfferCard1';
import SProductReview from '@/containers/SProductReview';
import api from '@common/api';
import { mapGetters } from 'vuex';
import PriceApi from '@common/services/PriceApi';
import { map, filter, find, uniqBy } from 'lodash-es';
import SalesCountApi from '@common/services/SalesCountApi';
import ZOptionTypesToggle from '@/components/ZOptionTypesToggle';

export default {
  name: 'ProductPage',
  components: {
    ZOptionTypesToggle,
    ZProductInfo,
    ZOfferCard,
    SProductReview,
  },
  props: {
    productId: VueTypes.id.isRequired,
  },
  data() {
    return {
      slide: 0,
      selectedOptions: {},
      rating: 0,
      reviewsCount: 0,
    };
  },
  asyncComputed: {
    // // start|AxrorbekNisonboyev|2020-10-29
    async product() {
      const { data: product } = await api.one('product', this.productId, {
        include: [
          'brand',
          'options',
          'options.type',
        ],
      });

      return {
        ...product,
        minPrice: (await PriceApi.cheapestCatalog({ product: product.id })).price,
        maxPrice: (await PriceApi.priciestCatalog({ product: product.id })).price,
      };
    },

    async catalogs() {
      const { data: catalogs } = await api.all('catalog', {
        include: [
          'seller',
          'element',
          'element.options',
          'element.product',
        ],
      });

      return filter(catalogs, ['element.product.id', this.productId]);
    },

    async salesCount() {
      return SalesCountApi.product({ id: this.productId });
    },
  },
  computed: {
    optionTypes() {
      if (!this.$asyncComputed.product.success) {
        return [];
      }

      const { options } = this.product;
      const optionTypes = uniqBy(map(options, 'type'), 'id');

      return optionTypes.map((optionType) => ({
        ...optionType,
        options: filter(options, ['type.id', optionType.id]),
      }));
    },

    filteredCatalogs() {
      const selectedOptionEntries = Object.entries(this.selectedOptions);

      return this.catalogs.filter(({ element }) => (
        selectedOptionEntries.every(([type, options]) => {
          if (options.length === 0) {
            return true;
          }

          const elementOption = find(element.options, ['type', Number(type)]);
          return options.includes(elementOption.id);
        })
      ));
    },

    isLoading() {
      return this.$asyncComputed.product.updating
        || this.$asyncComputed.catalogs.updating
        || this.$asyncComputed.salesCount.updating;
    },

    ...mapGetters({
      isInCart: 'cart/hasItem',
      isWished: 'wishlist/hasItem',
      isCompared: 'compare/hasItem',
    }),
  },
  methods: {
    updateIsInCart(offerId, isInCart) {
      if (isInCart) {
        this.$store.dispatch('cart/addItem', { offerId });
      } else {
        this.$store.dispatch('cart/removeItem', { offerId });
      }
    },

    onCompare() {
      this.$store.dispatch('compare/toggleItem', this.product.id);
    },

    onWish() {
      this.$store.dispatch('wishlist/toggleItem', this.product.id);
    },
  },
};
// end|AxrorbekNisonboyev|2020-10-29

</script>

<style lang="scss" scoped>
  .option-group {
    border: 1px solid $grey-5;
  }

  .description {
    border-top: 2px solid;
    border-top-color: rgba(0, 0, 0, 0.05);
  }
</style>
