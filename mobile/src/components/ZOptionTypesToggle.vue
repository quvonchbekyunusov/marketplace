<template>
  <ul>
    <li
      v-for="optionType in optionTypes"
      :key="optionType.id"
      class="q-mb-md"
    >
      <z-option-type-toggle
        :value="getActiveOptions(optionType)"
        :option-type="optionType"
        :is-multi="isMulti"
        @input="select(optionType, $event)"
      />
    </li>
  </ul>
</template>

<script>
import VueTypes from 'vue-types';
import ZOptionTypeToggle from '@/components/ZOptionTypeToggle';

export default {
  name: 'ZOptionTypesToggle',

  components: {
    ZOptionTypeToggle,
  },

  props: {
    value: VueTypes.objectOf(
      VueTypes.oneOfType([VueTypes.id, VueTypes.arrayOf(VueTypes.id)]),
    ).isRequired,
    optionTypes: VueTypes.arrayOf(VueTypes.optionType).isRequired,
    isMulti: VueTypes.bool.def(false),
  },

  methods: {
    getActiveOptions(optionType) {
      if (this.isMulti) {
        return this.value[optionType.id] || [];
      }

      return this.value[optionType.id] || null;
    },

    select(optionType, optionId) {
      this.$emit('input', {
        ...this.value,
        [optionType.id]: optionId,
      });
    },
  },
};
</script>
