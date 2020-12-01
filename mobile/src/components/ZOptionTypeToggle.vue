<template>
  <div>
    <b class="block text-subtitle1 q-mb-sm">{{ optionType.name }}</b>

    <ul class="row q-col-gutter-sm">
      <li v-for="option in optionType.options" :key="option.id" class="col-4">
        <z-option-toggle
          class="full-width"
          :option="option"
          :value="isActive(option)"
          @input="select(option)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import ZOptionToggle from '@/components/ZOptionToggle';
import { without } from 'lodash-es';

export default {
  name: 'ZOptionTypeToggle',

  components: {
    ZOptionToggle,
  },

  props: {
    value: VueTypes.oneOfType([VueTypes.id, VueTypes.arrayOf(VueTypes.id)]).isRequired,
    optionType: VueTypes.optionType.isRequired,
    isMulti: VueTypes.bool.def(false),
  },

  methods: {
    isActive(option) {
      return this.isMulti ? this.value.includes(option.id) : this.value === option.id;
    },

    select(option) {
      if (this.isMulti) {
        if (this.value.includes(option.id)) {
          this.$emit('input', without(this.value, option.id));
        } else {
          this.$emit('input', [...this.value, option.id]);
        }
      } else {
        this.$emit('input', option.id);
      }
    },
  },
};
</script>
