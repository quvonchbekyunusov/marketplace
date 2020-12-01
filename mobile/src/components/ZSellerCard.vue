<template>
  <q-card class="company-card" flat bordered>
    <router-link :to="{ name: 'seller', params: { id: seller.id } }" class="column no-wrap justify-between full-height">
      <q-img :src="seller.logo" contain basic native-context-menu />
      <span class="text-subtitle1 text-center q-pa-md">{{ seller.name }}</span>
    </router-link>
  </q-card>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZSellerCard',
  props: {
    seller: VueTypes.seller.isRequired,
  },
};

</script>

<style scoped>
  .company-card {
    width: 10.2rem;
  }
</style>
