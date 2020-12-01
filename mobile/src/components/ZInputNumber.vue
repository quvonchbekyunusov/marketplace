<template>
  <!-- start: Azimjon Toirov 09.10.2020 -->
  <div
    class="flex justify-center container"
  >
    <q-btn
      class="btn"
      flat
      padding="10px"
      icon="fa fa-minus"
      size="xs"
      color="grey-7"
      :disable="!canDecrement"
      @click="decrement"
    />
    <q-input
      :value="value"
      type="number"
      class="input"
      :class="{ 'is-invalid': !isValid }"
      :min="min"
      :max="max"
      :step="step"
      borderless
      input-class="text-center"
      @input="setValue"
    />
    <q-btn
      class="btn"
      flat
      padding="10px"
      icon="fa fa fa-plus"
      color="grey-7"
      size="xs"
      :disable="!canIncrement"
      @click="increment"
    />
  </div>
  <!-- end: Azimjon Toirov -->
</template>

<script>
// start: Azimjon Toirov 09.10.2020
import VueTypes from 'vue-types';

export default {
  name: 'ZInputNumber',
  props: {
    value: VueTypes.number.isRequired,
    min: VueTypes.number.def(Number.NEGATIVE_INFINITY),
    max: VueTypes.number.def(Number.POSITIVE_INFINITY),
    step: VueTypes.number.def(1),
  },
  computed: {
    isValid() {
      return this.validate(this.value);
    },

    canIncrement() {
      return this.validate(this.value + this.step);
    },

    canDecrement() {
      return this.validate(this.value - this.step);
    },
  },
  methods: {
    decrement() {
      this.setValue(this.value - this.step);
    },

    increment() {
      this.setValue(this.value + this.step);
    },

    setValue(value) {
      value = Number(value);
      if (!this.validate(value)) {
        return;
      }

      this.$emit('input', value);
    },

    validate(value) {
      return value <= this.max && value >= this.min;
    },
  },
};
// end: Azimjon Toirov
</script>

<style lang="scss" scoped>
  // start: Azimjon Toirov
  .input {
    max-width: 30px;
    height: 35px;
  }

  .is-invalid {
    border-color: $negative;
  }

  .btn:disabled {
    opacity: 0.3 !important;
  }

  // end: Azimjon Toirov
</style>
