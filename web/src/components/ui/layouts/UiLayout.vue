<template>
  <div class="flex-grow">
    <div class="w-full shadow">
      <z-navbar />
    </div>
    <z-home-nav />
    <slot />
    <z-footer class="mt-10" />
  </div>
</template>

<script>
import ZNavbar from '@/components/ZNavbar';
import ZFooter from '@/components/ZFooter';
import ZHomeNav from '@/components/ZHomeNav';

export default {
  name: 'UiLayout',
  components: {
    ZFooter,
    ZNavbar,
    ZHomeNav,
  },
};
</script>
