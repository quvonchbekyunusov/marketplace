<template>
  <ul class="q-gutter-y-md row items-baseline flex-center">
    <li
      v-for="option in options"
      :key="option.id"
      class="item"
      :style="cssVars"
      @click="selectOption(option.id)"
    >
      <slot name="option" :option="option" :is-active="value === option.id" />
    </li>
  </ul>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZOptionButtons',
  props: {
    value: VueTypes.any.def(null),
    options: VueTypes.arrayOf(
      VueTypes.shape({
        id: VueTypes.any.isRequired,
      }).loose,
    ).isRequired,
    gap: VueTypes.number.def(0),
  },
  computed: {
    cssVars() {
      console.log('hello world===================================================================', this.gap);
      return {
        marginRight: `${this.gap}px`,
      };
    },
  },
  methods: {
    selectOption(id) {
      this.$emit('input', id);
    },
  },
};
</script>

<style scoped>
.item:last-child {
  margin-right: 0;
}
</style>
