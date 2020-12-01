<template>
  <div class="welcome_wrapper">
    <div class="welcome_title q-my-lg q-px-md">
      {{ title }}
    </div>
    <q-img class="welcomeImg q-mb-lg" :src="logoWelcome" />
    <div class="welcome_body q-mb-lg">
      {{ body }}
    </div>
    <div class="welcome_btns">
      <q-btn label="Войти " class="btn q-mr-xs q-px-md" size="md" no-caps />
      <q-btn label="Создать профиль" class="btn q-px-md" size="md" no-caps />
    </div>
  </div>
</template>

<script>
import logoWelcome from '@/assets/logoWelcome.svg';
import VueTypes from 'vue-types';

export default {
  name: 'ZWelcomeToMarket',
  props: {
    title: VueTypes.string.isRequired,
    body: VueTypes.string.isRequired,
  },
  data() {
    return {
      logoWelcome,
    };
  },
};
</script>

<style scoped>
  .welcome_wrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .btn {
    font-size: 16px;
    line-height: 19px;
    color: #219653;
    border: 1px solid #219653;
    box-sizing: border-box;
    border-radius: 3px;
  }

  .welcome_btns {
    align-self: center;
  }

  .welcome_title {
    font-weight: 900;
    font-size: 28px;
    line-height: 42px;
    text-align: center;
    color: #333333;
  }

  .welcome_body {
    width: 70%;
    align-self: center;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
  }

  .welcomeImg {
    width: 30%;
    align-self: center;
  }
</style>
