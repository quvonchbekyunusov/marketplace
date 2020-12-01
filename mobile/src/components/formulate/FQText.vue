<template>
  <q-input
    v-model="context.model"
    :type="context.type"
    :label="label"
    :hint="hint"
    v-bind="context.attributes"
    bottom-slots
    :error="shouldShowErrors"
    @focus="onFocus"
    @blur="onBlur"
    @clear="onClear"
  >
    <template #error>
      <ul>
        <li
          v-for="error in [...context.errors, ...context.visibleValidationErrors]"
          :key="error"
          class="error-item"
        >
          {{ error }}
        </li>
      </ul>
    </template>
  </q-input>
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

    shouldShowErrors() {
      if (this.context.disableErrors) {
        return false;
      }

      return (this.context.errors.length + this.context.visibleValidationErrors.length) > 0;
    },
  },
  methods: {
    onFocus(event) {
      this.forwardEvent('focus', event);
    },

    onBlur(event) {
      this.context.blurHandler(event);
      this.forwardEvent('blur', event);
    },

    onClear(value) {
      this.forwardEvent('clear', value);
    },

    forwardEvent(name, payload) {
      this.context.rootEmit(name, payload);
    },
  },
};
</script>

<style lang="scss" scoped>
  .error-item:not(:last-child) {
    margin-bottom: map_get($space-xs, 'y');
  }
</style>
