<template>
  <div>
    <b class="block q-mb-sm">{{ optionGroup.name }}</b>
    <div v-if="isLoading" class="row justify-center">
      <q-spinner color="primary" />
    </div>
    <q-btn-toggle
      v-else
      :value="value"
      toggle-color="primary"
      :options="optionGroup.options.map(({ id, name }) => ({ label: name, value: id }))"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZOptionGroup',
  props: {
    optionGroup: VueTypes.object.isRequired,
  },
  data() {
    return {
      isLoading: true,
      options: null,
    };
  },
  async created() {
    this.isLoading = false;
  },
};
</script>
