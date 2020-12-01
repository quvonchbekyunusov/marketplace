<template>
  <div class="q-pa-md">
    <q-btn-toggle
      v-model="context.model"
      name="paymentType"
      toggle-color="teal"
      :options="[
        {label: 'Rock', value: 'rock'},
        {label: 'Funk', value: 'funk'},
        {label: 'Pop', value: 'pop'},
      ]"
    />
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'FQButtonToggle',
  props: {
    context: VueTypes.object.isRequired,
  },
};
</script>
