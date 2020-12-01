<template>
  <z-checkbox-ui
    id="input-terms"
    v-model="model"
    class-name="terms"
    name="terms"
    value="1"
    checked
    required
  >
    <checkbox name="terms" value="1" class="color">
      I agree to the <a href="#">terms of service</a>
    </checkbox>
  </z-checkbox-ui>
</template>

<script>

import ZCheckboxUi from 'vue-checkbox-radio';
import VueTypes from 'vue-types';

export default {
  name: 'UiCheckbox',
  components: {
    ZCheckboxUi,
  },
  props: {
    changeColor: VueTypes.string.def('primary'),
  },
  computed: {
    color() {
      if (this.changeColor === 'primary') {
        return 'text-primary-500';
      } else if (this.changeColor === 'secondary') {
        return 'text-secondary-500';
      } else if (this.changeColor === 'tertiary') {
        return 'text-tertiary-500';
      }
      return '';
    },
  },
};
</script>

<style scoped>

</style>
