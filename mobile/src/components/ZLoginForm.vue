<template>
  <q-form class="column q-pa-xl" @submit="onSubmit">
    <h1 class="text-center text-h5 q-my-md text-grey-9 text-weight-bold">
      Вход
    </h1>

    <q-input
      v-model="phone"
      filled
      class="q-mb-md"
      color="primary"
      label="Phone"
      mask="(##) ### - ## - ##"
      fill-mask
    />

    <q-input
      v-model="password"
      color="primary"
      class="q-mb-md"
      label="Пароль"
      filled
      :type="isPasswordVisible ? 'text' : 'password'"
      lazy-rules=""
    >
      <template #append>
        <div @click="togglePasswordVisibility">
          <q-icon :name="isPasswordVisible ? 'visibility' : 'visibility_off'" />
        </div>
      </template>
    </q-input>

    <q-btn label="Войти" color="primary" type="submit" no-caps />

    <router-link
      :to="{ name: 'register' }"
      class="block text-center text-underline text-primary q-mt-md"
    >
      Зарегистрироваться
    </router-link>
  </q-form>
</template>

<script>

export default {
  lname: 'ZLoginForm',
  data() {
    return {
      password: '',
      phone: '',
      isPasswordVisible: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    onSubmit() {
      this.$emit('submit', { phone: this.email, password: this.password });
    },
  },
};
</script>
