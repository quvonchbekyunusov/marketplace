<template>
  <div class="wrapper">
    <div class="header q-ma-lg">
      Настройки
    </div>
    <div class="body">
      <q-list class="q-mx-sm">
        <q-item to="#" class="editProfile" @click="$devDialog.show()">
          <p>Редактировать профиль</p>x
          <q-img :src="icon" class="img" />
        </q-item>
        <q-item to="#" class="notifications" @click="$devDialog.show()">
          <p>Уведомления</p>
          <q-img :src="icon" class="img" />
        </q-item>
        <q-item to="#" class="changeEmail" @click="$devDialog.show()">
          <p>Изменить электронную почту</p>
          <q-img :src="icon" class="img" />
        </q-item>
        <q-item to="#" class="darkTheme" @click="$devDialog.show()">
          <p>Темная тема</p>
          <q-img :src="icon" class="img" />
        </q-item>
        <q-item to="#" class="delete" @click="$devDialog.show()">
          <p>Удалить профиль</p>
          <q-img :src="icon" class="img" />
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import icon from '@/assets/strelkaVpravo.svg';

export default {
  name: 'ZSettings',
  data() {
    return {
      icon,
    };
  },
};
</script>

<style lang="scss" scoped>
  .editProfile, .notifications, .changeEmail, .darkTheme, .delete {
    display: flex;
    font-size: 14px;
    line-height: 16px;
    color: #555555;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 0.5rem;
    margin-bottom: 5%;

    p {
      width: 100%;
    }

    .img {
    }
  }

  .header {
    font-weight: 900;
    font-size: 24px;
    line-height: 28px;
    color: #333333;
  }

  .img {
    width: 8px;
    height: 10px;
  }
</style>
