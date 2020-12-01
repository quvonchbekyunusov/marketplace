<template>
  <q-page>
    <json-printer :value="sellers" />
    <div v-if="isLoading" class="row justify-center">
      <q-spinner color="primary" class="q-ma-md" size="lg" />
    </div>
    <div v-else class="row q-mx-auto cards-container">
      <h5 class="q-mt-md q-pl-sm full-width">
        продавец
      </h5>
      <z-seller-card
        v-for="seller in sellers"
        :key="seller.id"
        class="q-ma-sm brand-card"
        :brand="seller"
      />
    </div>
  </q-page>
</template>

<script>
import api from '@common/api';

import ZSellerCard from '@/components/ZSellerCard';

export default {
  name: 'SellersPage',
  components: {
    ZSellerCard,
  },
  data() {
    return {
      isLoading: true,
      sellers: null,
    };
  },
  async created() {
    await this.$store.dispatch('toolbar/setTitle', 'магазины');
    const { data: seller } = await api.one('seller', this.sellerId);
    this.sellers = seller;
    this.isLoading = false;
  },
};
</script>

<style scoped>

</style>
