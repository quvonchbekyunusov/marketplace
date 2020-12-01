<template>
  <div>
    <p class="q-mt-sm q-ml-md title">
      Фильтр по Брандам
    </p>
    <div class="flex justify-start wrap q-pa-md q-gutter-xs">
      <div
        v-for="{ id, logo, isSelected, isDisabled } in brands"
        :key="id"
        class="item q-pa-sm"
        :class="{ 'is-selected': isSelected, 'is-disabled': isDisabled }"
        @click="onClick(id)"
      >
        <q-img :src="logo" contain />
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZFilterBrand',
  props: {
    brands: VueTypes.arrayOf(VueTypes.object).isRequired,
  },
  data() {
    return {
      choosedItems: [],
    };
  },
  methods: {
    onClick(brandId) {
      this.$emit('update:brands', this.brands.map((brand) => {
        if (brand.id !== brandId) {
          return brand;
        }

        return {
          ...brand,
          isSelected: !brand.isSelected,
        };
      }));
    },
  },
};
</script>
<style scoped>
  .title {
    font-size: 14px;
    line-height: 16px;
  }

  .item {
    border: 1px solid transparent;
    border-radius: 5px;
    width: 30%;
  }

  .is-selected {
    border: 1px solid #27AE60;
  }

  .is-disabled {
    border: 1px solid red;
  }
</style>
