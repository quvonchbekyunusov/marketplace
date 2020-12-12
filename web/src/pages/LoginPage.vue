<template>
  <div class="flex items-center justify-center">
    <z-login-form />
  </div>
</template>

<script>
import ZLoginForm from '@/components/ZLoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    ZLoginForm,
  },
  created() {
    console.log('component created');
  },
};
</script>

<style></style>
