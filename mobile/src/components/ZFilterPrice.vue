<template>
  <div class="wrapper">
    <p class="q-ml-md">
      Фильтр по цене
    </p>
    <q-range
      v-model="range"
      :min="0"
      :max="10000000"
      :step="50000"
      maxlength="8"
      color="primary"
      class="range q-mx-auto"
      snap
      drag-range
    />
    <div class="flex justify-around ">
      <q-input
        v-model="range.min"
        label="от"
        borderless
        color="primary"
        :value="range.min"
        class="minPrice q-pl-sm"
        type="tel"
        prefix="UZS"
        maxlength="8"
        @blur="$emit('update:min', range.min)"
      />
      <q-input
        v-model="range.max"
        label="до"
        maxlength="8"
        color="primary"
        aria-valuemin="0"
        prefix="UZS"
        borderless
        :value="range.max"
        class="maxPrice q-pl-sm"
        type="tel"
        @blur="$emit('update:max', range.max)"
      />
    </div>
  </div>
</template>

<script>

import icon from '@/assets/delete.svg';

export default {
  name: 'ZFilterPrice',
  props: {},
  data() {
    return {
      isError: false,
      icon,
      range: {
        min: 0,
        max: 10000000,
      },
    };
  },
  watch: {
    'range.min': function (newVal) {
      if (newVal > 10000000) {
        this.range.min = 10000000;
      }
      return this.range.min;
    },
    'range.max': function (newVal) {
      if (newVal > 10000000) {
        this.range.max = 10000000;
      }
      return this.range.min;
    },
  },
  created() {
    // this.range.max = this.max;
    // this.range.min = this.min;
  },
  methods: {
    updateMinPrice(minPrice) {
      this.$emit('update:min', minPrice);
    },
    updateMaxPrice(maxPrice) {
      this.$emit('update:max', maxPrice);
    },
  },
};
</script>

<style scoped lang="scss">

  .range {
    width: 80%;
  }

  .minPrice, .maxPrice {
    height: 36px;
    font-size: 12px;
    width: 37%;
    border: 1px solid $primary;
    border-radius: 5px;
  }
</style>
