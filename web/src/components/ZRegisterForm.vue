<template>
  <div class="login-card-form flex shadow-lg w-1/2 rounded-xl">
    <div class="w-1/2">
      <p class="text-center text-primary-500 font-bold my-4">Регистрация</p>
      <div class="my-4">
        <img src="images/login.jpg" alt="Login Form Image" class="mx-auto">
      </div>
      <div class="flex justify-center">
        <button
          class="bg-transparent hover:bg-primary-500 text-primary-500 font-semibold hover:text-white
          py-2 px-4 border border-primary-500 hover:border-transparent rounded"
        >
          <router-link :to="{ name: 'login' }">
            Login
          </router-link>
        </button>
      </div>
    </div>
    <div class="w-1/2">
      <div class="w-40 mb-5 mt-12 mx-auto">
        <label for="email">Введите эл.почта</label><br>
        <input id="email" type="email" name="email" class="login-input-style">
      </div>

      <div class="w-40 mb-10 mx-auto">
        <label for="password">Введите Пароль</label><br>
        <input id="password" type="password" name="password" class="login-input-style"><br>
        <span class="text-sm">Не можете войти?</span>
      </div>

      <div class="w-40 mt-20 mx-auto">
        <button
          class="bg-primary-500 hover:bg-white text-white hover:text-primary font-semibold
          py-2 px-4 border hover:border-primary-500 rounded mb-8"
        >
          Регистрация
        </button>
      </div>
      <p class="text-primary-500 text-xs mx-8">
        Входя в раздел Мой профиль, вы принимаете Условия использования сайта
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
  .login-card-form {
    width: 700rem;
    height: auto;
    margin: 5rem 18rem;
    padding: 2rem 3rem;
  }
  .login-input-style {
    background: #F9F9F9;
    border: 1px solid #E6E6E6;
    box-sizing: border-box;
    border-radius: 5px;
  }
</style>
