<template>
  <q-layout view="hHh lpR fFf">
    <z-header />
    <z-navbar-bottom />

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script>
import ZHeader from '@/components/ZHeader';
import ZNavbarBottom from '@/components/ZNavbarBottom';

export default {
  name: 'MainShell',
  components: {
    ZHeader,
    ZNavbarBottom,
  },
};
</script>
