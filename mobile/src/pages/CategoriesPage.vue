<template>
  <q-page class="row no-wrap overflow-hidden" :style-fn="pageStyleFn">
    <s-catalog />
  </q-page>
</template>

<script>
import SCatalog from '@/containers/SCatalog';

export default {
  name: 'CategoriesPage',
  components: {
    SCatalog,
  },
  methods: {
    pageStyleFn(offset, height) {
      return {
        height: `${height - offset}px`,
      };
    },
  },
};
</script>
