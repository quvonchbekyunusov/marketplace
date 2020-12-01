<template>
  <!-- start|Axrorbek|Nisonboyev|12.10.2020 -->
  <q-page-container style="padding-top: 0">
    <q-page class="q-pa-md q-pt-none">
      <div v-if="isLoading" class="absolute-full row justify-center items-center">
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
              v-for="(image, index) in catalog.element.product.images"
              :key="image"
              :name="index"
              class=" q-pa-none"
            >
              <q-img :src="image" width="100%" height="250px" :ratio="4 / 3" contain />
            </q-carousel-slide>
          </q-carousel>

          <div class="row justify-center q-mt-xs">
            <q-btn-toggle
              v-model="slide"
              flat
              dense
              size="4px"
              toggle-color="primary"
              color="grey-5"
              :options="catalog.element.product.images.map(
                (_, index) => ({ value: index, icon: 'fas fa-circle' })
              )"
            />
          </div>

          <div class="absolute-top flex justify-between q-ma-md">
            <q-btn
              round
              flat
              icon="compare_arrows"
              :color="isCompared(catalogId) ? 'primary' : ''"
              class="text-capitalize"
              outline
              size="lg"
              @click="onCompare(catalogId)"
            >
              <q-tooltip anchor="bottom middle" self="top middle">
                Here I am!
              </q-tooltip>
            </q-btn>

            <q-btn
              round
              flat
              :icon="isWished(catalog.element.product.id) ? 'o_favorite' : 'favorite_border'"
              :color="isWished(catalog.element.product.id) ? 'red' : ''"
              class="text-capitalize"
              outline
              size="lg"
              @click="onWish(catalog.element.product.id)"
            >
              <q-tooltip>
                Some text as content of Tooltip
              </q-tooltip>
            </q-btn>
          </div>
        </div>
        <div class="q-my-md">
          <z-info
            class="full-width"
            :infos="{
              name: catalog.element.name,
              brand: {
                name: catalog.element.product.brand.name,
                logo: catalog.element.product.brand.logo,
              },
              salesCount: salesCount,
            }"
            :price="{ value: catalog.price, old: catalog.oldPrice }"
            :total-rating="reviewInfo.averageRating"
            :reviews-count="reviewInfo.reviewsCount"
          />
        </div>
        <z-option-types-toggle
          :value="selectedOptions"
          class="q-my-md"
          :option-types="optionTypes"
          @input="onSelectedOptionsUpdate"
        />

        <div class="q-mb-md">
          <z-characteristic-tab
            :options="catalog.element.options"
            :description="catalog.element.product.description"
          />
        </div>
        <div>
          <!--          <s-product-review-->
          <!--            :product-id="catalog.element.product.id"-->
          <!--            :take="4"-->
          <!--          />-->
        </div>
        <div>
          <!-- //start |Doniyor Raxmonov| 2020-10-27 -->
          <div class="">
            <div class="flex justify-between">
              <span class="showAllRev" @click.prevent="dialogToggle">
                Посмотреть все отзывы
              </span>
            </div>
            <show-all-reviews
              :product-id="catalog.element.product.id"
              :dialog="showAllReviews"
              @dialog-is-closed="dialogToggle"
            />
            <!--            <json-printer :value="typeof catalog.element.product.id" />-->
            <create-review class="q-my-sm" :product-id="catalog.element.product.id" />
            <!-- //end |Doniyor Raxmonov | 2020-10-27-->
            <!--    <create-review :product-id="productId" />-->
          </div>
        </div>
        <div>
          <q-item>
            <h6 class="flex column">
              <span class="text-h6 text-bold">Магазины с таким же продуктом</span>
              <span class="text-subtitle1">
                {{ catalogs.length }} - предложений
              </span>
            </h6>
          </q-item>
          <z-offer-card
            v-for="catalog in catalogs"
            :key="catalog.id"
            :offer="catalog"
            :price="{
              value: catalog.price,
              old: catalog.oldPrice }"
            :is-in-cart="isInCart(catalog.id)"
            :rating="reviewInfo.averageRating"
            :reviews-count="reviewInfo.reviewsCount"
            class="q-mb-md"
            @update:is-in-cart="updateIsInCart(catalog.id, $event)"
          />
        </div>
      </div>
    </q-page>
    <div
      v-if="!isLoading"
      class="row no-wrap justify-between items-center bg-grey-2 q-pa-md fixed-bottom q-mb-xl"
    >
      <div>
        <p class="text-bold">
          Цена: {{ $n(catalog.price, 'currency') }}
        </p>
        <p>
          Продовец: {{ catalog.seller.name }}
        </p>
      </div>
      <div>
        <q-btn
          color="primary"
          :label="isInCart(catalogId) ? 'В корзине' : 'В корзину'"
          class="q-px-md rounded-borders"
          :outline="!isInCart(catalogId)"
          @click="updateIsInCart(catalogId, !isInCart(catalogId))"
        />
      </div>
    </div>
  </q-page-container>
  <!-- end|Axrorbek|Nisonboyev| -->
</template>

<script>
import VueTypes from 'vue-types';
import api from '@common/api';
// import ZOptionsGroup from '@/components/ZOptionsGroup';
import ZInfo from '@/components/ZInfo';
import ZOfferCard from '@/components/ZOfferCard1';
import ZCharacteristicTab from '@/components/ZCharactAndDescriptionTab';
// import SProductReview from '@/containers/SProductReview';
import { filter, map, uniqBy } from 'lodash-es';
import { mapGetters } from 'vuex';
import PopularApi from '@common/services/PopularApi';
import ShowAllReviews from '@/components/ShowAllReviews';
import CreateReview from '@/components/CreateReview';
import ZOptionTypesToggle from '@/components/ZOptionTypesToggle';
import ReviewApi from '@common/services/ReviewApi';
import SalesCountApi from '@common/services/SalesCountApi';
// start|AxrorbekNisonboyev|2020-10-12

export default {
  name: 'CatalogPage',
  components: {
    CreateReview,
    // ZOptionsGroup,
    ZInfo,
    ZOfferCard,
    ZCharacteristicTab,
    // SProductReview,
    ShowAllReviews,
    ZOptionTypesToggle,
  },
  props: {
    catalogId: VueTypes.id.isRequired,
  },
  data() {
    return {
      slide: 0,
      showAllReviews: false,
      selectedOptions: {},
    };
  },
  computed: {
    isLoading() {
      return this.$asyncComputed.catalog.updating
        || this.$asyncComputed.catalogs.updating;
    },

    // start|AxrorbekNisonboyev|2020-10-26
    optionTypes() {
      if (!this.$asyncComputed.catalog.success) {
        return [];
      }

      const { options } = this.catalog.element.product;
      const optionTypes = uniqBy(map(options, 'type'), 'id');

      return optionTypes.map((optionType) => ({
        ...optionType,
        options: filter(options, ['type.id', optionType.id]),
      }));
    },
  },
  // end|AxrorbekNisonboyev|2020-10-26

  asyncComputed: {
    async catalog() {
      const { data: catalog } = await api.one('catalog', this.catalogId, {
        include: [
          'seller',
          'element',
          'element.product',
          'element.product.brand',
          'element.product.options',
          'element.product.options.type',
          'element.options',
          'element.options.type',
        ],
      });

      return catalog;
    },

    async catalogs() {
      if (!this.$asyncComputed.catalog.success) {
        return [];
      }
      const { data: catalogs } = await api.all('catalog', {
        include: [
          'seller',
          'element',
          'element.product',
          'element.options',
          'element.options.type',
        ],
        filter: {
          id: `ne:${this.catalogId}`,
          element: this.catalog.element.id,
        },
      });

      return catalogs;
    },

    async reviewInfo() {
      if (!this.$asyncComputed.catalog.success) {
        return {};
      }

      return ReviewApi.product({ id: this.catalog.element.product.id });
    },

    async salesCount() {
      return SalesCountApi.catalog({
        id: this.catalogId,
      });
    },

    ...mapGetters({
      isInCart: 'cart/hasItem',
      isWished: 'wishlist/hasItem',
      isCompared: 'compare/hasItem',
    }),
  },
  watch: {
    catalog: {
      immediate: true,
      handler(newCatalog) {
        if (!newCatalog) {
          return;
        }

        this.selectedOptions = Object.fromEntries(
          newCatalog.element.options.map(({ id, type }) => [type.id, id]),
        );
      },
    },
  },
  methods: {
    // start|AxrorbekNisonboyev|2020-10-26
    async onSelectedOptionsUpdate(options) {
      const selectedOptions = Object.entries(options).map(([type, option]) => ({ type, option }));

      const { data: elements } = await api.all('element', {
        filter: {
          product: this.catalog.element.product.id,
        },
      });

      const selectedOptionIds = map(selectedOptions, 'option');

      const element = elements.find(({ options: elementOptions }) => (
        selectedOptionIds.every((optionId) => elementOptions.includes(optionId))
      ));

      if (!element) {
        alert('Эта комбинация товара не найдена!');
        return;
      }

      const newCatalog = await PopularApi.elementCatalog({ element: element.id });

      if (!newCatalog) {
        alert('Эта комбинация товара не найдена!');
        return;
      }

      await this.$router.push({
        name: 'catalog',
        params: {
          id: newCatalog.id,
        },
      });
    },
    // end|AxrorbekNisonboyev|2020-10-26
    // start  | Doniyor Raxmonov |2020-10-27
    dialogToggle() {
      this.showAllReviews = !this.showAllReviews;
    },
    // end  | Doniyor Raxmonov | 2020-10-27

    updateIsInCart(offerId, isInCart) {
      if (isInCart) {
        this.$store.dispatch('cart/addItem', { offerId });
      } else {
        this.$store.dispatch('cart/removeItem', { offerId });
      }
    },

    onCompare(id) {
      this.$store.dispatch('compare/toggleItem', id);
    },

    onWish(id) {
      this.$store.dispatch('wishlist/toggleItem', id);
    },
  },
};
// end|AxrorbekNisonboyev|2020-10-12
</script>
<style scoped lang="scss">
  .showAllRev {
    background: #fff;
    color: #7AA0DA;
  }

  .btn-size {
    height: 30px;
    width: 101px;
    border: 1px solid $primary;
    box-sizing: border-box;
    border-radius: 6px;
  }
</style>
