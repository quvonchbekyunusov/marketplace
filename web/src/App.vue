<template>
  <div id="app" class="flex-grow flex flex-col">
    <main-shell />
  </div>
</template>

<script>
import MainShell from '@/shells/MainShell.vue';

export default {
  name: 'App',
  components: {
    MainShell,
  },
};
</script>
