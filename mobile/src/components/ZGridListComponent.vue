<template>
  <div>
    <!--    <json-printer :value="products" />-->
    <z-grid-list @getDisplayType="catchDisplayType" />

    <ul class="row q-col-gutter-x-md q-col-gutter-y-lg q-px-md q-mb-md">
      <li
        v-for="product in products"
        :key="product.id"
        :class="[displayType === 'grid' ? 'col-6' : 'col-12']"
      >
        <!-- //start |Doniyor Raxmonov| 2020-10-30 -->
        <component
          :is="listItemComponent"
          :product="product"
          :price="product.price"
          :is-wished="isInWishlist(product.id)"
          :is-in-cart="isInCart(product.id)"
          :reviews-count="product.reviewsCount"
          :rating="product.rating"
          @update:is-wished="updateIsWished(product.id, $event)"
        />
        <!-- //end |Doniyor Raxmonov | 2020-10-30-->
        <!--        &lt;!&ndash;        <component&ndash;&gt;-->
        <!--        &lt;!&ndash;  :is="listItemComponent"&ndash;&gt;-->
        <!--        &lt;!&ndash;  :product="product"&ndash;&gt;-->
        <!--        &lt;!&ndash;  :price="product.offer.price"&ndash;&gt;-->
        <!--        &lt;!&ndash;  :is-wished="isInWishlist(product.id)"&ndash;&gt;-->
        <!--        &lt;!&ndash;  :is-in-cart="isInCart(product.id)"&ndash;&gt;-->
        <!--        &lt;!&ndash;  :reviews-count="product.reviewsCount"&ndash;&gt;-->
        <!--        &lt;!&ndash;  :rating="product.rating"&ndash;&gt;-->
        <!--        &lt;!&ndash;  @update:is-wished="updateIsWished(product.offer.id, $event)"&ndash;&gt;-->
        <!--        &lt;!&ndash;  @update:is-in-cart="updateIsInCart(product.offer.id, $event)"&ndash;&gt;-->
        <!--        &lt;!&ndash;        />&ndash;&gt;-->
        <!--      </li>-->
        <!--    </ul>-->
        <!--    </li>-->
        <!--    </ul>-->
      </li>
    </ul>
  </div>
</template>

<script>
import ZGridList from '@/components/ZGridList';
import VueTypes from 'vue-types';
import { mapGetters } from 'vuex';
// start  | Doniyor Raxmonov | 2020-10-30
import ZProductCard from './ZProductCard';
import ZProductListCard from './ZProductListCard';
// end  | Doniyor Raxmonov | 2020-10-30

export default {
  name: 'ZGridListComponent',
  components: {
    ZGridList,
  },
  props: {
    products: VueTypes.arrayOf(VueTypes.object).isRequired,
  },
  data() {
    return {
      isLoading: true,
      displayType: 'grid',
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
    // listItemComponent() {
    //   // return this.displayType === 'grid' ? ZProductCartDumb : ZListCard;
    // },
    // start  | Doniyor Raxmonov | 2020-10-30
    listItemComponent() {
      return this.displayType === 'grid' ? ZProductCard : ZProductListCard;
    },
    // end  | Doniyor Raxmonov | 2020-10-30
  },
  watch: {
    displayedProducts() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
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
