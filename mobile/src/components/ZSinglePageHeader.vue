<template>
  <div class="flex no-wrap items-center">
    <q-avatar size="40px">
      <img v-if="object.logo" :src="object.logo" alt="">
      <p v-else>
        {{ object.name.charAt(0) }}
      </p>
    </q-avatar>
    <div class="q-ml-md">
      <div class="name no-wrap ellipsis-1-lines text-primary">
        {{ object.name }}
      </div>
      <p class="text-grey-7">
        {{ productsCount }} товаров
      </p>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZSinglePageHeader',
  props: {
    object: VueTypes.object.isRequired,
    productsCount: VueTypes.number,
  },
};
</script>

<style scoped>
  .name {
    width: 100px;
    font-size: 20px;
    line-height: 1.2;
  }
</style>
