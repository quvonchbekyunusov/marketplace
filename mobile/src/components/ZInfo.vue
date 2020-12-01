<template>
  <div>
    <!--start: Aziz Rozmetov 10/12/2020 -->
    <p class="text-weight-bold name q-mb-xs">
      {{ infos.name }}
    </p>
    <p class="text-weight-bold q-mb-md text-body1">
      Цена : {{ $n(price.value, 'currency') }}
    </p>
    <div class="row items-start justify-between">
      <div>
        <z-rating type="badge" class="q-mb-md" size="sm" :rating="totalRating" :reviews-count="reviewsCount" />
        <p class="sales-count-label text-weight-thin">
          Купили более {{ infos.salesCount }} раз
        </p>
        <p class="text-weight-thin sellerName ellipsis">
          Брэнд:<span class="seller">{{ infos.brand.name }}</span>
        </p>
      </div>
      <q-img :src="infos.brand.logo" width="100px" />
    </div>
  </div>
  <!--end: Aziz Rozmetov  10/12/2020-->
</template>

<script>
// start: Aziz Rozmetov  10/13/2020

import VueTypes from 'vue-types';
import ZRating from '@/components/ZRating';

export default {
  name: 'ZInfo',
  components: {
    ZRating,
  },
  props: {
    infos: VueTypes.shape({
      name: VueTypes.string.isRequired,
      salesCount: VueTypes.number.def(0),
      brand: VueTypes.shape({
        logo: VueTypes.string.isRequired,
        name: VueTypes.string.isRequired,
      }),
    }),
    price: VueTypes.shape({
      value: VueTypes.number.isRequired,
      old: VueTypes.number.def(null),
    }),
    reviewsCount: VueTypes.number.def(0),
    totalRating: VueTypes.number.def(0),
  },
};
// end: Aziz Rozmetov    10/13/2020
</script>
<style scoped>
  /* start: Aziz Rozmetov  10/13/2020*/

  .name {
    font-size: 18px;
  }

  .sales-count-label {
    font-size: 10px;
  }

  .sellerName {
    width: 230px;
  }

  .seller {
    font-size: 14px;
    margin-left: 7px;
  }

  .seller-label {
    font-size: 12px;
  }

  /* end: Aziz Rozmetov   10/13/2020*/
</style>
