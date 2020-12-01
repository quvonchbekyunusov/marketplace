<template>
  <vue-json-pretty
    :show-double-quotes="false"
    show-length
    highlight-mouseover-node
    :deep="3"
    :custom-value-formatter="formatter"
    :data="value"
  />
</template>

<script>
import VueTypes from 'vue-types';
import VueJsonPretty from 'vue-json-pretty';

export default {
  name: 'JsonPrinter',
  components: {
    VueJsonPretty,
  },
  props: {
    value: VueTypes.any.isRequired,
  },
  methods: {
    formatter(data) {
      if (typeof data === 'string' && (data.startsWith('http://') || data.startsWith('https://'))) {
        return `<a href="${data}" target="_blank" referrerpolicy="no-referrer">${data}</a>`;
      }

      return data;
    },
  },
};
</script>

<style scoped>

</style>
