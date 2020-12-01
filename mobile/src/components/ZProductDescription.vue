<template>
  <div>
    <h6 class="q-mb-xs">
      Описание товара
    </h6>
    <p class="text-grey-7">
      {{ product.description }}
    </p>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZProductDescription',
  props: {
    product: VueTypes.object.isRequired,
  },
};
</script>
