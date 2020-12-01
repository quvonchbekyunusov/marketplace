<template>
  <q-form class="column q-pa-xl" @submit="onSubmit">
    <h1 class="text-center text-h5 q-my-md text-grey-9 text-weight-bold">
      Регистрация
    </h1>

    <q-input
      v-model="name"
      class="q-mb-md"
      label="Ваше имя"
      color="primary"
      filled
      lazy-rules
      :rules="[ val => val.length > 3 || 'Пожалуйста введите свое имя']"
    />
    <q-input
      v-model="email"
      filled
      class="q-mb-md"
      color="primary"
      label="Phone"
      mask="#########"
      fill-mask
    />
    <q-input
      v-model="password"
      color="primary"
      class="q-mb-md"
      label="Пароль"
      filled
      :type="isPasswordVisible ? 'text' : 'password'"
      lazy-rules
      :rules="[ val => val.length > 7 || 'Пожалуйста введите свое пароль']"
    >
      <template #append>
        <div @click="togglePasswordVisibility">
          <q-icon :name="isPasswordVisible ? 'visibility' : 'visibility_off'" />
        </div>
      </template>
    </q-input>
    <q-input
      v-show="confirmationShow"
      v-model="passwordConfirmation"
      color="primary"
      label="Подтвердите пароль"
      class="q-mb-md"
      filled
      :type="isPasswordVisible ? 'text' : 'password'"
      lazy-rules
      :rules="[ val => isPasswordVisible ? true: password === val || 'Пароль не совпадает']"
    />
    <q-btn label="Зарегистрироваться" color="primary" type="submit" no-caps />
    <router-link :to="{ name: 'login' }" class="block text-center text-underline text-primary q-mt-md">
      Войти
    </router-link>
  </q-form>
</template>

<script>

export default {
  name: 'ZRegisterForm',
  data() {
    return {
      name: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      isPasswordVisible: false,
      confirmationShow: true,
      model: null,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.confirmationShow = !this.confirmationShow;
    },
    test() {
      console.log(this.phone);
    },
    onSubmit() {
      this.$emit('submit', {
        title: this.name,
        email: this.email,
        password: this.password,
        role: 'client',
      });
    },
  },
};
</script>
