<template>
  <q-dialog v-model="card" full-width :maximized="maximizedToggle">
    <q-card class="q-pa-md" flat>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-body1">
          Популярное предложение
        </div>
        <q-space />
        <q-btn v-close-popup class="text-grey-5" icon="close" flat round dense />
      </q-card-section>
      <div class="row items-center q-my-md">
        <div class="col">
          <p class="text-subtitle1 text-grey-9 text-weight-light">
            {{ product.name }}
          </p>
          <z-rating type="badge" class="q-mt-xs" :reviews-count="reviewsCount" :rating="rating" />
          <p class="text-weight-medium q-my-xs text-subtitle1">
            {{ offer.priceNew ? $n(offer.priceNew,'currency') : $n(offer.price,'currency') }} sum
          </p>
          <p v-if="offer.priceNew" class="text-grey-6 text-discount">
            {{ $n(offer.price, 'currency') }}
          </p>
          <div class="flex items-baseline">
            <span class="text-grey-6 text-caption">Продавец:</span>
            <q-img
              :src="sellerLogo"
              spinner-color="white"
              contain
              class="q-my-auto seller-logo"
            />
          </div>
        </div>
        <div class="col">
          <q-img
            :src="product.images[0]"
            class="product-image"
          />
        </div>
      </div>

      <div class="q-my-sm separator-line" />

      <div class="row q-my-md">
        <div class="col">
          <z-charasteristics-table v-if="options" :data="options" />
        </div>
        <div class="col flex column content-end">
          <span class="text-caption text-left q-pb-xs">Количество</span>
          <z-input-number :value="quantity" @input="$emit('update:quantity', $event)" />
        </div>
      </div>
      <div class="row">
        <q-btn label="Продолжить" color="primary" class="full-width" @click="$emit('continueFunc')" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import ZInputNumber from '@/components/ZInputNumber';
import ZRating from '@/components/ZRating';
import VueTypes from 'vue-types';
import ZCharasteristicsTable from '@/components/ZCharasteristicsTable';

export default {
  name: 'ZBuyCard',
  components: {
    ZInputNumber,
    ZRating,
    ZCharasteristicsTable,
  },
  props: {
    product: VueTypes.product.isRequired,
    offer: VueTypes.catalog.isRequired,
    sellerLogo: VueTypes.string.isRequired,
    options: VueTypes.arrayOf(VueTypes.shape({
      option: VueTypes.string,
      value: VueTypes.string,
    })).def(null),
    reviewsCount: VueTypes.number.def(0),
    rating: VueTypes.number.def(0),
    quantity: VueTypes.number.def(1),
  },
  data() {
    return {
      card: true,
      maximizedToggle: true,
    };
  },
};
</script>

<style scoped>
  .text-discount {
    margin-top: -9px;
    font-size: 10px;
    text-decoration: line-through;
  }

  .separator-line {
    width: 100%;
    height: 1px;
    background-color: #dfdfdf;
  }

  .seller-logo {
    margin-top: 0.7px;
    height: 20px;
    max-width: 65px;
  }

  .product-image {
    height: 130px;
  }
</style>
