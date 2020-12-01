<template>
  <q-btn
    :label="context.model"
    :type="context.type"
    v-bind="context.attributes"
    v-on="$listeners"
  />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'FQTextInput',
  props: {
    context: VueTypes.object.isRequired,
  },
  computed: {
    label() {
      return this.context.hasLabel ? this.context.label : undefined;
    },

    hint() {
      return this.context.help !== '' ? this.context.help : undefined;
    },

    hasErrors() {
      if (this.context.disableErrors) {
        return false;
      }

      return this.context.errors.length > 0 || this.context.visibleValidationErrors.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
  .error-item:not(:last-child) {
    margin-bottom: map_get($space-xs, 'y');
  }
</style>
