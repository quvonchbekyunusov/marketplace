<template>
  <q-layout view="hHh LpR fFf">
    <z-toolbar />
    <z-navbar-bottom />

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script>
import ZToolbar from '@/components/ZToolbar';
import ZNavbarBottom from '@/components/ZNavbarBottom';

export default {
  name: 'ToolbarShell',
  components: {
    ZToolbar,
    ZNavbarBottom,
  },
};
</script>
