<template>
  <q-select
    v-model="context.model"
    v-bind="context.attributes"
    :options="context.options"
    :label="label"
    :hint="hint"
    :error="hasErrors"
    @blur="context.blurHandler"
  >
    <template #error>
      <ul>
        <li v-for="error in [...context.errors, ...context.visibleValidationErrors]" :key="error" class="error-item">
          {{ error }}
        </li>
      </ul>
    </template>
  </q-select>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'FQSelectInput',
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
      if (this.context.hasValue) {
        return false;
      }

      return this.context.errors.length > 0 || this.context.visibleValidationErrors.length > 0;
    },
  },
};
</script>
