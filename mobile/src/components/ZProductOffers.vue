<template>
  <div class="q-my-md">
    <div v-if="isLoading" class="row justify-center">
      <q-spinner color="primary" />
    </div>
    <template v-else-if="offers.length && filteredOffers.length > 0">
      <h6 class="q-mb-sm">
        Предложения магазинов
      </h6>
      <z-market-card v-for="offer in filteredOffers" :key="offer.id" :offer="offer" class="q-mt-sm" />
    </template>
    <h6 v-else>
      Нет предложений
    </h6>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import { uniq } from 'lodash-es';
import ZMarketCard from '@/components/ZMarketCard';
import api from '@common/api';

export default {
  name: 'ZProductOffers',
  components: {
    ZMarketCard,
  },
  props: {
    product: VueTypes.object.isRequired,
    options: VueTypes.objectOf(VueTypes.string).def({}),
  },
  data() {
    return {
      isLoading: true,
      offers: null,
      filteredOffers: null,
    };
  },
  watch: {
    offers: 'filterOffers',
    options: {
      selectOption: 'filterOffers',
      deep: true,
    },
  },
  async created() {
    this.offers = (await api.offers.all()).filter(({ product }) => product === this.product.id);
    this.isLoading = false;
  },
  methods: {
    async filterOffers() {
      this.isLoading = true;

      const offerOptionIds = uniq(this.offers.flatMap(({ options }) => options));
      const allOptions = await Promise.all(offerOptionIds.map(api.options.one));

      this.filteredOffers = this.offers
        .filter(({ options }) => (
          options.every((optionId) => {
            const optionGroup = allOptions.find(({ id }) => id === optionId).group;
            return !this.options[optionGroup] || this.options[optionGroup] === optionId;
          })
        ));
      console.log('filtered offers', this.filteredOffers);
      this.isLoading = false;
    },
  },
};
</script>
