<template>
  <!-- start|AzimjonToirov|10/20/2020 -->
  <ui-layout>
    <div class="w-full shadow">
      <z-navbar />
    </div>
    <z-home-nav />
    <router-view />
    <z-footer />
  </ui-layout>
  <!-- end|AzimjonToirov|10/20/2020 4lines -->
</template>

<script>
import UiLayout from '@/components/ui/layouts/UiLayout';
import ZNavbar from '@/components/ZNavbar';
import ZFooter from '@/components/ZFooter';
import ZHomeNav from '@/components/ZHomeNav';

export default {
  name: 'MainShell',
  components: {
    UiLayout,
    ZNavbar,
    ZFooter,
    ZHomeNav,
  },
};
/* end|AzimjonToirov|10/20/2020 4lines */
</script>
