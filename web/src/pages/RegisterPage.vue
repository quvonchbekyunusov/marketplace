<template>
  <div class="flex items-center justify-center">
    <z-register-form />
  </div>
</template>

<script>
import ZRegisterForm from '@/components/ZRegisterForm.vue';

export default {
  name: 'RegisterPage',
  components: {
    ZRegisterForm,
  },
  created() {
    console.log('component created');
  },
};
</script>

<style></style>
