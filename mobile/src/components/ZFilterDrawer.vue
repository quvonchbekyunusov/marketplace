<template>
  <q-drawer
    ref="drawer"
    :value="isOpen"
    side="right"
    bordered
    :width="280"
    :content-style="{ backgroundColor: '#ffffff' }"
    @hide="close"
  >
    <div class="row flex-end">
      <q-btn size="md" unelevated icon="clear" @click="close" />
    </div>
    <z-filter-brand v-if="brands" :brands.sync="filters.brands" />
    <z-filter-price
      :min.sync="filters.prices.min"
      :max.sync="filters.prices.max"
    />
    <z-other-filters :options-group.sync="filters.optionGroups" />
    <div class="flex justify-center">
      <q-btn class="btn_item clear" no-caps @click="clear">
        Очистить
      </q-btn>
      <q-btn class="btn_item q-ml-md" no-caps @click="saveOptions">
        Принять
      </q-btn>
    </div>
  </q-drawer>
</template>

<script>
import ZFilterBrand from '@/components/ZFilterBrand';
import ZFilterPrice from '@/components/ZFilterPrice';
import ZOtherFilters from '@/components/ZOtherFilters';
import VueTypes from 'vue-types';
import api from '@common/api';
import { filter, flatMap, map } from 'lodash-es';
import { mapGetters } from 'vuex';

export default {
  name: 'ZFilterDrawer',
  components: {
    ZFilterPrice,
    ZFilterBrand,
    ZOtherFilters,
  },
  props: {
    brands: VueTypes.arrayOf(VueTypes.id),
    optionGroups: VueTypes.arrayOf(VueTypes.object).isRequired,
    isLoading: VueTypes.bool.def(true),
  },
  data() {
    return {
      filters: {
        brands: [],
        prices: {},
        optionGroups: [],
      },
    };
  },
  computed: {
    ...mapGetters('filters', ['isOpen']),
  },
  watch: {
    brands: {
      async handler(brandIds) {
        const brands = await api.multiple('brand', brandIds);
        this.filters.brands = brands.data.map((brand) => ({ ...brand, isSelected: false }));
      },
      immediate: true,
    },

    optionGroups: {
      async handler(optionGroups) {
        this.filters.optionGroups = await Promise.all(
          optionGroups.map(async (optionGroup) => {
            const { options } = optionGroup;
            return {
              ...optionGroup,
              options: options.map((option) => ({ ...option, isSelected: false })),
            };
          }),
        );
      },
      immediate: true,
    },
    price: {
      handler(price) {
        if (price) {
          this.$store.dispatch('filters/setPrice', { price });
          console.log(this.filters.prices);
        }
      },
      immediate: true,
    },
  },
  methods: {
    close() {
      this.$store.dispatch('filters/close');
    },
    clear() {
      this.filters.brands.forEach((brand) => {
        brand.isSelected = false;
      });
      this.filters.optionGroups.forEach((optionGroup) => {
        optionGroup.options.forEach((option) => {
          option.isSelected = false;
        });
      });
      this.$store.dispatch('filters/clearOptions');
      this.$store.dispatch('filters/clearPrice');
      this.$store.dispatch('filters/clearBrands');
    },
    saveOptions() {
      const selectedOptionIds = map(
        filter(
          flatMap(this.filters.optionGroups, 'options'),
          'isSelected',
        ), 'id',
      );

      const selectedBrandIds = map(filter(this.filters.brands, 'isSelected'), 'id');

      let selectedPrices = null;

      if (this.filters.prices.min === 0 && this.filters.prices.max === 0) {
        selectedPrices = null;
      } else {
        selectedPrices = this.filters.prices;
      }

      this.$store.dispatch('filters/setOptions', selectedOptionIds);
      this.$store.dispatch('filters/setPrice', selectedPrices);
      this.$store.dispatch('filters/setBrands', selectedBrandIds);

      this.close();
    },
  },
};
</script>
<style scoped lang="scss">
  .btn_item {
    width: 40%;
    font-size: 14px;
    line-height: 16px;
    background: $primary;
    border-radius: 3px;
    color: #ffffff;
  }

  .clear {
    background: $secondary;
    color: #fff;
  }
</style>
