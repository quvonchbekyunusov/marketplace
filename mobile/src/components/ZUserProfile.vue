<template>
  <div class="q-mt-md q-mb-md">
    <q-item>
      <h4 class="text-h6">
        {{ name }}
      </h4>
    </q-item>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZUserProfile',
  props: {
    name: VueTypes.string.isRequired,
  },
};
</script>
