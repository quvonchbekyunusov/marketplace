<template>
  <!-- start: Azimjon Toirov 09.10.2020 -->
  <q-page>
    <div class="flex justify-between items-center q-mt-md">
      <span style="font-size: medium;" class="text-bold">Карты</span>

      <div class="flex">
        <q-btn
          align="between"
          class="btn-fixed-width"
          color="black"
          size="xs"
          flat
          icon="fas fa-plus"
          @click="isCardsBottomSheetOpen = true"
        >
          <p class="q-ml-sm" style="font-size: small">
            Добавить
          </p>
        </q-btn>
        <q-btn
          align="between"
          class="btn-fixed-width"
          color="black"
          size="xs"
          flat
          icon="fas fa-minus"
          @click="removeCreditCard(creditCardName)"
        >
          <p class="q-ml-sm" style="font-size: small">
            Удалить
          </p>
        </q-btn>
      </div>
    </div>

    <credit-cards-swiper v-if="creditCardDataCount" :cards="creditCardData" @creditCard="onCreditCard" />

    <div v-if="isFromCheckout" class="flex justify-center">
      <q-btn
        label="Вернутса к оформления заказа"
        color="primary"
        class="q-mt-md"
        :to="{ name: 'checkout' }"
      />
    </div>

    <z-bottom-sheet v-model="isCardsBottomSheetOpen">
      <template #default>
        <v-credit-card @change="creditCardChange" />
        <div class="flex justify-center q-mx-md q-mb-md">
          <q-btn
            label="Подтвердить"
            color="primary"
            class="full-width"
            @click="submitCreditCard"
          />
        </div>
      </template>
    </z-bottom-sheet>
  </q-page>
  <!-- end: Azimjon Toirov -->
</template>

<script>
// start: Azimjon Toirov 09.10.2020
import { mapGetters } from 'vuex';
import CreditCardsSwiper from '@/components/CreditCardsSwiper';
import ZBottomSheet from '@/components/ZBottomSheet';

import VCreditCard from 'v-credit-card';
import 'v-credit-card/dist/VCreditCard.css';
import api from '@common/api';

export default {
  name: 'UserPaymentCards',
  components: {
    VCreditCard,
    CreditCardsSwiper,
    ZBottomSheet,
  },
  constants: {
    user: {
      name: 'Demo User',
      phone: '+998 99 789 55 46',
    },
  },
  data() {
    return {
      creditCardName: null,
      isCardsBottomSheetOpen: false,
      creditCard: {},
      userData: {},
    };
  },
  computed: {
    ...mapGetters({
      creditCardData: 'creditCard/items',
      creditCardDataCount: 'creditCard/itemsCount',
      isFromCheckout: 'creditCard/isFromCheckout',
    }),
  },
  async created() {
    await this.$store.dispatch('toolbar/setTitle', 'Мои платежные карты');
    this.userData = await api.me() || this.user;
  },
  methods: {
    removeCreditCard(creditCardName) {
      this.$store.dispatch('creditCard/removeCreditCard', creditCardName);
    },
    onCreditCard(creditCardName) {
      this.creditCardName = creditCardName;
    },
    creditCardChange(creditCard) {
      this.creditCard.name = creditCard.name;
      this.creditCard.cardNumber = creditCard.cardNumber;
      this.creditCard.expires = creditCard.expiration.replace('/', '');
      this.creditCard.cardHolder = this.userData.name;
      this.creditCard.type = this.creditCardType(creditCard);
    },
    creditCardType(credit) {
      if (credit.cardNumber.startsWith('9860')) {
        return 'humo';
      } else if (credit.cardNumber.startsWith('8600')) {
        return 'uzcard';
      } else if (credit.cardNumber.startsWith('6262')) {
        return 'unionpay';
      }
      return 'cash';
    },
    submitCreditCard() {
      if (Object.entries(this.creditCard).length > 0) {
        this.$store.dispatch('creditCard/setCreditCard', this.creditCard);
        this.isCardsBottomSheetOpen = false;
      }
    },
  },
};
// end: Azimjon Toirov
</script>
