<template>
  <!--start: Makhmudov Mirfozil-->
  <q-page>
    <div v-if="isLoading" class="row justify-center">
      <q-spinner color="primary" class="q-ma-md" size="lg" />
    </div>
    <div v-else class="row q-mx-auto cards-container">
      <h5 class="q-mt-md q-pl-sm full-width">
        Бренды
      </h5>
      <z-brand-card
        v-for="brand in brands"
        :key="brand.id"
        class="q-ma-sm brand-card"
        :brand="brand"
      />
    </div>
  </q-page>
  <!--end: Makhmudov Mirfozil-->
</template>

<script>
// start: Mirfozil Makhmudov
import api from '@common/api';
import ZBrandCard from '@/components/ZBrandCard';

export default {
  name: 'BrandsPage',
  components: {
    ZBrandCard,
  },
  data() {
    return {
      isLoading: true,
      brands: null,
    };
  },
  async created() {
    // start Axrorbek Nisonboyev 08.10.2020
    // connected real api
    this.brands = (await api.all('brand')).data;
    // end Axrorbek Nisonboyev
    this.$store.dispatch('toolbar/setTitle', 'Бренды');
    this.isLoading = false;
  },
};
// end: Mirfozil Makhmudov
</script>
<style scoped>
  /*start: Makhmudov Mirfozil*/
  .cards-container {
    width: 95%;
  }

  .brand-card {
    width: 100px;
    height: 100px;
  }

  /*end: Makhmudov Mirfozil*/
</style>
