<template>
  <q-card class="card flex no-wrap justify-between" flat>
    <q-img
      class="col-5"
      :src="offer.product.images[0]"
      width="120px"
      height="100px"
    />

    <q-card-section class="column items-end q-pa-none">
      <p class="text-body1 text-weight-bolder text-grey-9">
        {{ offer.product.name }}
      </p>
      <p class="q-mb-xs ellipsis description text-left">
        {{ offer.product.description }}
      </p>
      <p class="text-grey-9 text-left">
        {{ offer.seller.name }}
      </p>
      <p class="text-body1 text-weight-bolder">
        {{ $n(offer.price.value, 'currency') }}
      </p>
    </q-card-section>
  </q-card>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZOrderBlockItem',
  props: {
    offer: VueTypes.catalog.isRequired,
  },
};
</script>

<style scoped>
  .card {
    width: 100%;
  }

  .description {
    width: 150px;
    font-height: 10px;
  }
</style>
