<template>
  <!--start: Aziz Rozmetov 10/10/2020 -->
  <q-page class="relative-position">
    <!--    <json-printer :value="compare" />-->
    <fragment v-if="compareCount > 0">
      <div v-if="isLoading">
        <q-spinner size="sm" />
      </div>
      <q-scroll-area
        v-else
        ref="main-scroll-area"
        :thumb-style="{ display: 'none' }"
        horizontal
        class="absolute-full"
      >
        <div class="row no-wrap q-pt-md">
          <div v-for="offer in catalogs" :key="offer.id" class="compare-card">
            <!-- //start |Doniyor Raxmonov| 2020-10-26 -->
            <z-compare-product-card
              :product="offer.element.product"
              :price="{
                value: offer.price,
                old :offer.oldPrice,
              }"
              :is-in-cart="isInCart(offer.id)"
              @delete="deleteInCompare(offer.id)"
              @update:is-in-cart="updateIsInCart(offer.id, $event)"
            />
            <!-- //end |Doniyor Raxmonov | 2020-10-26-->
          </div>
        </div>
        <ul>
          <div class="q-pl-sm q-py-md">
            <div class="sticky-label column" :style="{'width': labelWidth}">
              <q-toggle
                v-model="showOnlyDiffs"
                color="primary"
                dense
                class="q-my-md"
                label="Показать только различия"
              />
              <p class="text-weight-bold">
                Рейтинг
              </p>
              <!--              <json-printer :value="catalogs" />-->
              <!--              <json-printer :value="optionTypeComparisons" />-->
            </div>
            <!-- //start |Doniyor Raxmonov| 2020-10-26 -->
            <div v-for="([groupName, options,i]) in optionTypeComparisons" :key="`${groupName}${i}`">
              <div class="sticky-label option-title" :style="{'width': labelWidth}">
                {{ groupName }}
              </div>
              <div class="full-width flex no-wrap q-mt-sm">
                <div v-for="(option,k) in options" :key="`${option} ${k}`" class="option  q-pb-sm">
                  {{ option }}
                </div>
              </div>
            </div>
            <!-- //end |Doniyor Raxmonov | 2020-10-26-->
            <div class="row no-wrap full-height">
              <!--              <li-->
              <!--                v-for="offer in offers"-->
              <!--                :key="offer.id"-->
              <!--                style="min-width: 190px"-->
              <!--                class="row items-center option-title q-pl-md text-grey-6"-->
              <!--              >-->
              <!--                <z-rating-->
              <!--                  class="q-mt-xs"-->
              <!--                  :rating="offer.rating"-->
              <!--                  :reviews-count="offer.reviewsCount"-->
              <!--                />-->
              <!--              </li>-->
            </div>
          </div>
        </ul>
        <li v-for="(optionGroup, i) in optionGroups" :key="i" class="q-pl-sm q-py-lg">
          <p class="text-weight-bold sticky-label" :style="{'width': labelWidth}">
            {{ optionGroup.name }}
          </p>
          <ul class="row no-wrap full-height">
            <li
              v-for="offer in offers"
              :key="offer.id"
              style="min-width: 190px"
              class="row items-center option-title q-pl-md text-grey-6"
            >
              {{ (offer.options.find(({ group }) => group === optionGroup.id) || { name: '-' }).name }}
            </li>
            <li
              v-for="(option, key) in filteredOptions"
              :key="option"
            >
              {{ fetchOption(optionGroup.id, key, option) }}
            </li>
          </ul>
        </li>
        <li v-for="(opts, key) in filteredOptions" :key="key" class="q-pl-sm q-py-lg">
          <p class="text-weight-bold sticky-label" :style="{'width': labelWidth}">
            {{ awaitExpression(getName(key).data.name) }}
          </p>
          <ul class="row no-wrap full-height">
            <li
              v-for="option in opts"
              :key="option"
              style="min-width: 190px"
              class="row items-center option-title q-pl-md text-grey-6"
            >
              {{ option }}
            </li>
            <li
              v-for="(option, k) in filteredOptions"
              :key="option"
            >
              {{ fetchOption(optionGroup.id, k, option) }}
            </li>
          </ul>
        </li>
      </q-scroll-area>
      <!--end: Aziz Rozmetov  10/10/2020-->
    </fragment>
    <z-empty-state
      v-else
      :content="{
        body: 'Добавьте товары для сравнения',
        icon: 'o_compare',
        title: 'Нет товаров',
      }"
      :btn="{
        label: 'К товарам',
        color: 'primary',
        textColor: 'white',
        to: {
          name: 'home'
        }
      }"
      class="absolute-full"
    />
  </q-page>
</template>

<script>

import { mapGetters } from 'vuex';
import api from '@common/api';
import ZCompareProductCard from '@/components/ZCompareProductCard';
import { map, flatMap, uniqBy } from 'lodash-es';
import ZEmptyState from '@/components/ZEmptyState';
// import ZRating from '@/components/ZRating';

export default {
  name: 'ComparePage',
  components: {
    ZCompareProductCard,
    ZEmptyState,
  },
  data() {
    return {
      ignoredSources: [],
      optionGroups: [],
      catalogs: null,
      isLoading: true,
      showOnlyDiffs: false,
    };
  },
  // start : Doniyor Raxmonov 2020-10-26
  asyncComputed: {
    async catalogs() {
      const { data: catalogs } = await api.multiple('catalog', this.compare, {
        include: ['element', 'element.product', 'element.options', 'element.options.type'],
      });

      return catalogs;
    },
    // end  | Doniyor Raxmonov | 2020-10-26
  },
  computed: {
    ...mapGetters('compare', { compare: 'items', compareCount: 'itemsCount' }),
    ...mapGetters({
      isInCart: 'cart/hasItem',
    }),
    labelWidth() {
      if (this.catalogs) {
        return this.catalogs.length <= 2 ? '90%' : '300px';
      }
      return null;
    },
    // start  | Doniyor Raxmonov |  2020-10-26
    optionTypeComparisons() {
      const allOptions = flatMap(this.catalogs, 'element.options');
      const allOptionTypes = map(allOptions, 'type');
      const optionTypes = uniqBy(allOptionTypes, 'id');

      const optionTypeComparisons = optionTypes.map(({ id, name }) => {
        const catalogOptions = this.catalogs.map((catalog) => {
          const catalogOption = catalog.element.options.find(({ type }) => type.id === id);
          return catalogOption?.name || '-';
        });
        return [name, catalogOptions];
      });
      if (this.showOnlyDiffs) {
        return optionTypeComparisons.filter(([, options]) => (
          options.some((option) => option !== options[0])
        ));
      }
      return optionTypeComparisons;
    },
    // end  | Doniyor Raxmonov | 2020-10-26
    // getOptionGroups() {
    //   return uniqBy(this.optionGroups);
    // },
  },
  watch: {
    compare: {
      async handler() {
        // start  | Doniyor Raxmonov  10/26/2020 |
        // this.catalogs = (await api.multiple('catalog', ['13132', '13227', '13019'], {
        //   include: ['element', 'element.product', 'element.options', 'element.options.type'],
        // })).data;
        // start  | Doniyor Raxmonov mock api code |
        // this.offers = await Promise.all(offers.map(async (offer) => {
        //   const product = await this.fetchProduct(offer.element.product.id);
        //   const reviews = await api.reviews.multiple(offer.reviews);
        //   return ({
        //     ...offer,
        //     product,
        //     options: await api.multiple('option', offer.element.product.options),
        //     reviewsCount: reviews.length,
        //     rating: sumBy(reviews, 'rating') / reviews.length,
        //   });
        // }));

        // this.filteredOptions = this.getAllOptions(this.offers);
        // end : Doniyor Raxmonov
        // start: Aziz Rozmetov  10/12/2020
        // this.optionGroups = await this.fetchOptionGroups(this.offers);
        // this.optionGroups = uniqBy(flatMap(products, 'options'), 'id');
      },
      immediate: true,
    },
  },

  async created() {
    this.$store.dispatch('toolbar/setTitle', 'Сравнить');
    this.isLoading = false;
  },
  methods: {
    // async fetchProduct(id) {
    //   const product = await api.one('product', id);
    //
    //   return {
    //     ...product,
    //   };
    // },
    // async fetchOptionGroups(offers) {
    //   const allOptions = offers.flatMap(({ options }) => options.map((option) => ({
    //     ...option,
    //   })));

    // const optionGroups = _.groupBy(allOptions, 'group');
    // const result = Object.entries(optionGroups).map(([group]) => ({ id: group }));
    //     const listOfGroupIds = uniqBy(allOptions.map((el) => el.group));
    //     return((await api.multiple('option-type', listOfGroupIds))
    // ).data.map(({ id, name }) => ({
    //   id,
    //   name,
    // }));
    // },
    updateIsInCart(offerId, isInCart) {
      if (isInCart) {
        this.$store.dispatch('cart/addItem', { offerId });
      } else {
        this.$store.dispatch('cart/removeItem', { offerId });
      }
    },
    // async fetchOption(optionGroupId, key, option) {
    //   const optionGroup = await api.optionGroups.one(optionGroupId);
    //   const optionGroupName = optionGroup.name;
    //   if (optionGroupId === key) {
    //     return {
    //       ...option,
    //       optionGroupName: optionGroup[key],
    //     };
    //   }
    // },
    // async getName(id) {
    //   const option = await api.one('option-type', id);
    //   const { name } = option.data;
    //   return name;
    // },
    deleteInCompare(offerId) {
      this.$store.dispatch('compare/removeItem', offerId);
    },
    // end: Aziz Rozmetov    10/12/2020
    // start : Doniyor Raxmonov
    // getAllOptions(offers) {
    //   const choosedOptions = {};
    //   offers.forEach((offer) => {
    //     offer.element.product.options.forEach(async (option) => {
    //       const optionGroup = await api.optionGroups.one(option.group);
    //       const optionGroupName = optionGroup.name;
    //       if (choosedOptions.hasOwnProperty(option.id)) {
    //         choosedOptions[option.id].push(option.name);
    //       } else {
    //         choosedOptions[option.id] = [];
    //         choosedOptions[option.id].push(option.name);
    //       }
    //     });
    //   });
    //   return this.filterDifferentsOptions(choosedOptions);
    // },
    // filterDifferentsOptions(options) {
    //   const innerOptions = options;
    //   Object.entries((innerOptions)).forEach(([key, val]) => {
    //     if (val.length > 1 && this.allEqual(val)) {
    //       delete innerOptions[key];
    //     }
    //   });
    //   return innerOptions;
    // },
    // end : Doniyor Raxmonov
  },
};
</script>

<style scoped>
  /* start: Aziz Rozmetov  10/12/2020*/
  .sticky-label {
    position: sticky;
    left: 24px;
    width: 90%;
  }

  .option-title {
    color: #000;
    font-weight: bold;
  }

  .option {
    width: 40%;
    display: inline-block;
    margin: 0 15px;
    padding-left: 25px;
  }

  .compare-card {
    width: 190px;
  }

  /* end: Aziz Rozmetov   10/12/2020*/
</style>
