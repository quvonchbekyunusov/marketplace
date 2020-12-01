<!--start: Aziz Rozmetov 10/10/2020 -->
<template>
  <div>
    <q-scroll-area
      ref="scrollArea"
      horizontal
      class="category-area"
      :thumb-style="{ opacity: 0 }"
    >
      <div v-if="categories" class="row no-wrap fit justify-center">
        <z-category-suggestion
          v-for="(category, i) in categories"
          :ref="'categoryCard-' + category.id"
          :key="category.id"
          :category-icon="category.icon || no.icon"
          :category-name="category.name"
          :category-id="`${category.id}`"
          class="category-card q-ma-sm"
          :class="{
            'is-first': i === 0,
            'is-last': i === categories.length - 1 }"
        />
      </div>
    </q-scroll-area>
  </div>
</template>

<!--end: Aziz Rozmetov  10/10/2020-->
<script>
import VueTypes from 'vue-types';
import ZCategorySuggestion from './ZCategorySuggestion';

export default {
  name: 'ZCategoriesHorizontal',
  components: {
    ZCategorySuggestion,
  },
  constants: {
    no: {
      icon: 'fa fa-star',
    },
  },
  props: {
    categories: VueTypes.array.isRequired,
  },

};

</script>

<style scoped lang="scss">
  .category-area {
    width: 100%;
    height: 65px;
  }

  .category-card {
    width: 140px;
    height: 48px;
    //
    &.is-first {
      margin-left: 16px;
    }

    &.is-last {
      margin-right: 16px;
    }

  }
</style>
