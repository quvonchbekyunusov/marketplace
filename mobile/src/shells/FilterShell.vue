<template>
  <q-layout view="HHH ppR ppp">
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
  name: 'FilterShell',
  components: {
    ZToolbar,
    ZNavbarBottom,
  },
};
</script>
