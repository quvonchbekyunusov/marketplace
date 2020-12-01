<template>
  <q-page class="column justify-center">
    <z-register-form @submit="onRegister" />
  </q-page>
</template>

<script>
import VueTypes from 'vue-types';
import ZRegisterForm from '@/components/ZRegisterForm';

export default {
  name: 'RegisterPage',
  components: {
    ZRegisterForm,
  },
  props: {
    redirectTo: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def({ name: 'home' }),
  },
  methods: {
    async onRegister(user) {
      try {
        await this.$store.dispatch('auth/register', user);
        await this.$router.replace(this.redirectTo);
      } catch {
        this.$q.notify({
          message: 'Пользователь с данным номер уже зарегистрирован',
          type: 'negative',
          position: 'top',
        });
      }
    },
  },
};
</script>
