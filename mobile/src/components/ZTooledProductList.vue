<template>
  <div>
    <div class="row">
      <q-btn
        text-color="black"
        icon-right="filter_alt"
        label="Фильтр"
        padding="xs"
        class="filter-button col-4 text-capitalize"
        unelevated
        @click="openFilters"
      />
      <z-filter-drawer :option-groups="optionGroups" :brands="brands" />
      <z-grid-list class="col-8" @getDisplayType="catchDisplayType" />
    </div>
    <div
      v-if="!products.length"
      class="col-12 text-center q-my-xl"
    >
      <p class="text-subtitle2 text-grey-7">
        Нет товаров в этой категории
      </p>
    </div>
    <ul else class="row q-col-gutter-x-md q-col-gutter-y-lg q-px-md q-mb-md">
      <li
        v-for="product in products"
        :key="product.id"
        :class="[displayType === 'grid' ? 'col-6' : 'col-12']"
      >
        <component
          :is="listItemComponent"
          :product="product"
          :price="product.offer.price"
          :is-wished="isInWishlist(product.id)"
          :is-in-cart="isInCart(product.offer.id)"
          :reviews-count="product.reviews.length"
          :rating="product.rating"
          @update:is-wished="updateIsWished(product.id, $event)"
          @update:is-in-cart="updateIsInCart(product.offer.id, $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ZGridList from '@/components/ZGridList';
import VueTypes from 'vue-types';
import ZProductCartDumb from '@/components/ZProductCartDumb';
import ZListCard from '@/components/ZListCard';
import { mapActions, mapGetters } from 'vuex';
import ZFilterDrawer from '@/components/ZFilterDrawer';

export default {
  name: 'ZTooledProductList',
  components: {
    ZGridList,
    ZProductCartDumb,
    ZListCard,
    ZFilterDrawer,
  },
  props: {
    products: VueTypes.arrayOf(VueTypes.object).isRequired,
    optionGroups: VueTypes.arrayOf(VueTypes.object).isRequired,
    brands: VueTypes.arrayOf(VueTypes.id),
  },
  data() {
    return {
      isLoading: true,
      displayType: 'grid',
      category: null,
    };
  },
  computed: {
    ...mapGetters({
      isInWishlist: 'wishlist/hasItem',
      isInCart: 'cart/hasItem',
      brandFilters: 'filters/brands',
      priceFilters: 'filters/price',
      optionFilters: 'filters/options',
    }),
    listItemComponent() {
      return this.displayType === 'grid' ? ZProductCartDumb : ZListCard;
    },
  },
  methods: {
    ...mapActions({
      openFilters: 'filters/open',
    }),
    updateIsWished(productId, isWished) {
      if (isWished) {
        this.$store.dispatch('wishlist/addItem', productId);
      } else {
        this.$store.dispatch('wishlist/removeItem', productId);
      }
    },
    catchDisplayType(payload) {
      this.displayType = payload;
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
