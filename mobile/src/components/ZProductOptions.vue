<template>
  <div>
    <div v-if="isLoading" class="row justify-center">
      <q-spinner color="primary" />
    </div>
    <template v-else-if="optionGroups.length > 0">
      <h6 class="q-mb-sm">
        Свойства товара
      </h6>
      <z-option-group
        v-for="(optionGroup) in optionGroups"
        :key="optionGroup.id"
        class="q-mb-lg"
        :option-group="optionGroup"
        :value="selectedOptions[optionGroup.id]"
        @input="onOptionChange(optionGroup.id, $event)"
      />
    </template>
    <h6 v-else>
      Нет свойств
    </h6>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import ZOptionGroup from '@/components/ZOptionGroup';
import api from '@common/api';

export default {
  name: 'ZProductOptions',
  components: {
    ZOptionGroup,
  },
  props: {
    product: VueTypes.object.isRequired,
    value: VueTypes.objectOf(VueTypes.string).isRequired,
  },
  data() {
    return {
      isLoading: true,
      optionGroups: null,
      selectedOptions: {},
    };
  },
  watch: {
    selectedOptions(options) {
      this.$emit('input', options);
    },
  },
  async created() {
    this.optionGroups = await Promise.all(this.product.optionGroups.map(api.optionGroups.one));
    this.isLoading = false;
  },
  methods: {
    onOptionChange(group, option) {
      this.selectedOptions = {
        ...this.selectedOptions,
        [group]: option,
      };
    },
  },
};
</script>
