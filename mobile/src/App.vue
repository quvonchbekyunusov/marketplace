<template>
  <div id="q-app">
    <template>
      <component :is="shell">
        <router-view :key="$route.fullPath" />
      </component>
    </template>
  </div>
</template>
<script>
import VueTypes from 'vue-types';
import { findLast, has } from 'lodash-es';
import EmptyShell from '@/shells/EmptyShell';
import extendVueTypes from '@common/extendVueTypes';

extendVueTypes(VueTypes);

export default {
  name: 'App',
  data() {
    return {
      isLoading: true,
      shell: null,
    };
  },
  watch: {
    $route: {
      handler() {
        this.shell = findLast(this.$route.matched, (route) => has(route, 'meta.shell'))?.meta?.shell ?? EmptyShell;
      },
      immediate: true,
    },
  },
};
</script>
