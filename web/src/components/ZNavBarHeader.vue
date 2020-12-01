<template>
  <div
    class="
      flex items-center
      md:container
      mx-auto py-3"
  >
    <z-button
      title="Мобильное приложение"
      class="text-white"
      bg-color="gray-500"
    />
  </div>
</template>

<script>
import ZButton from '@/components/ZButton';

export default {
  name: 'ZNavBarHeader',
  components: {
    ZButton,
  },
};
</script>

<style scoped>

</style>
