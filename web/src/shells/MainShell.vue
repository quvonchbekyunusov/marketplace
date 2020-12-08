<template>
  <!-- start|AzimjonToirov|10/20/2020 -->
  <ui-layout>
    <router-view />
  </ui-layout>
  <!-- end|AzimjonToirov|10/20/2020 4lines -->
</template>

<script>
import UiLayout from '@/components/ui/layouts/UiLayout';

export default {
  name: 'MainShell',
  components: {
    UiLayout,
  },
};
/* end|AzimjonToirov|10/20/2020 4lines */
</script>
