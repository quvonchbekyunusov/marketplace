<template>
  <!--start: Makhmudov Mirfozil-->
  <q-card class="brand-card" flat>
    <router-link
      :to="{ name: 'brand', params: { id: brand.id } }"
      class="fit flex flex-center text-no-decoration"
    >
      <q-img width="100%" :src="brand.logo" contain :ratio="16/9" native-context-menu />
      <p class="q-mx-sm text-caption text-center ellipsis-2-lines">
        {{ brand.name }}
      </p>
    </router-link>
  </q-card>
  <!--end: Makhmudov Mirfozil-->
</template>

<script>
// start: Mirfozil Makhmudov
import VueTypes from 'vue-types';

export default {
  name: 'ZBrandCard',
  props: {
    brand: VueTypes.brand.isRequired,
  },
};
// end: Mirfozil Makhmudov
</script>

<style scoped>
  /*start: Makhmudov Mirfozil*/
  .brand-card {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15) !important;
    border-radius: 6px;
    min-width: 120px;
  }

  /*end: Makhmudov Mirfozil*/
</style>
