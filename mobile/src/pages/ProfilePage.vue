<template>
  <div class="q-pa-lg">
    <div v-if="isLoading">
      <q-spinner size="sm" />
    </div>
    <div v-else>
      <z-profile-header
        :user="userData"
      />
      <z-profile-categories
        :data="fakeData"
        @toggleEvent="showFunc"
      />
    </div>
  </div>
</template>

<script>
import ZProfileCategories from '@/components/ZProfileCategories';
import ZProfileHeader from '@/components/ZProfileHeader';
import api from '@common/api';

export default {
  name: 'ProfilePage',
  components: {
    ZProfileCategories,
    ZProfileHeader,
  },
  data() {
    return {
      fakeData: [
        {
          id: '1',
          link: '/profile/orders',
          icon: 'shopping_cart',
          label: 'Мои заказы',
          type: 'basic',
        },
        {
          id: '2',
          link: '/wishlist',
          icon: 'favorite_border',
          label: 'Мои избранные',
          type: 'basic',
        },
        {
          id: '3',
          link: '/in-development',
          icon: 'notifications_none',
          label: 'Уведомления',
          type: 'toggle',
        },
        {
          id: '4',
          link: '/profile/payment-cards',
          icon: 'help_outline',
          label: 'Мои платежные карты',
          type: 'dialog',
        },
        {
          id: '5',
          link: '/in-development',
          icon: 'settings',
          label: 'Настройки',
          type: 'dialog',
        },
        {
          id: '6',
          link: '/in-development',
          icon: 'work_outline',
          label: 'Справка',
          type: 'dialog',
        },
        {
          id: '7',
          link: '/in-development',
          icon: 'help_outline',
          label: 'О нас',
          type: 'dialog',
        },

      ],
      userData: null,
      isLoading: true,
    };
  },
  async created() {
    this.userData = await api.me();
    this.isLoading = false;
  },
  methods: {
    showFunc(payload) {
      console.log('toggle value: ', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
  .avatar {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25)
  }

  .avatar-image {
    border: 8px solid #ffffff;
  }

  .user-container {
    position: relative;
    padding-top: 65px;

    &::after {
      position: absolute;
      content: '';
      display: block;
      background: $primary;
      height: 130px;
      width: 100%;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }
</style>
