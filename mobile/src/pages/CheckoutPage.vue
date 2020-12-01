<template>
  <!-- start: Azimjon Toirov 09.10.2020 -->
  <q-page class="relative-position">
    <div v-if="cartItemsCount" class="q-mx-md">
      <div class="user-information" />
      <div class="q-my-lg">
        <div class="">
          <q-input v-model="user.name" color="primary" class="rounded-borders" outlined label="Имя" />
        </div>
        <div class="q-mt-lg">
          <q-input
            v-model="user.phone"
            color="primary"
            class="rounded-borders"
            outlined
            label="Контактный номер"
          />
        </div>
      </div>
      <div class="flex justify-between items-center q-mt-md">
        <span style="font-size: medium;" class="text-bold">Адрес</span>
        <div class="flex">
          <q-btn
            align="between"
            class="btn-fixed-width"
            color="black"
            size="xs"
            flat
            icon="fas fa-plus"
            @click="isBottomSheetOpen = true"
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
            @click="removeAddress(locationAddressName)"
          >
            <p class="q-ml-sm" style="font-size: small">
              Удалить
            </p>
          </q-btn>
        </div>
      </div>

      <z-history-locations
        v-if="locationItemsCount"
        class="q-my-md"
        :locations="locationItems"
        :location-choosed="locationAddressName"
        @location-changed="locationChanged"
      />

      <div class="payment-types">
        <div class="flex items-center">
          <span>Виды оплаты</span>
          <q-space />
          <router-link
            class="btn-fixed-width"
            color="black"
            size="xs"
            flat
            icon="fas fa-plus"
            :to="{ name: 'payment-cards' }"
          >
            <p class="q-ml-sm">
              Добавить
            </p>
          </router-link>
        </div>
        <div class="q-gutter-sm flex column">
          <q-radio
            v-model="paymentType"
            keep-color
            val="cash"
            label="Наличные"
          />
          <q-radio
            v-for="radio in creditCardData"
            :key="radio.name"
            v-model="paymentType"
            keep-color
            :val="radio.name"
            :label="radio.name + ` (${radio.type})`"
          />
        </div>
      </div>

      <z-bottom-sheet v-model="isBottomSheetOpen">
        <template #default>
          <z-checkout-form @submit="setLocation" />
        </template>
      </z-bottom-sheet>

      <div class="flex justify-center q-mt-md">
        <q-btn
          label="Подтвердить заказ"
          color="primary"
          @click="onSubmitOrder"
        />
      </div>
    </div>

    <div v-else class="absolute-full">
      <div class="fit column flex-center">
        <z-empty-state
          :content="{
            image: require('../assets/emptystate/online_shopping 1.png'),
            ratio: 5 / 3,
            title: 'Ещё не готовы к покупке?',
            body: 'Добавляйте сюда то, что нравится',
          }"
          :btn="{
            label: 'К товарам',
            color: 'primary',
            to: {
              name: 'home'
            }
          }"
          class="absolute-full"
        />
      </div>
    </div>
  </q-page>
  <!-- end: Azimjon Toirov -->
</template>

<script>
// start: Azimjon Toirov 09.10.2020
import api from '@common/api';
import { head } from 'lodash-es';
import { mapGetters } from 'vuex';
import ZCheckoutForm from '@/components/ZCheckoutForm';
import ZEmptyState from '@/components/ZEmptyState';
import ZBottomSheet from '@/components/ZBottomSheet';
import ZHistoryLocations from '@/components/ZHistoryLocations';

export default {
  name: 'CheckoutPage',
  components: {
    ZCheckoutForm,
    ZEmptyState,
    ZBottomSheet,
    ZHistoryLocations,
  },
  data() {
    return {
      isBottomSheetOpen: false,
      locationAddressName: null,
      locationError: false,
      paymentType: 'cash',
      user: {
        name: 'Demo Name',
        phone: 'Demo Phone',
      },
    };
  },
  computed: {
    ...mapGetters({
      cartItemsCount: 'cart/itemsCount',
      locationItemsCount: 'locations/itemsCount',
      locationItems: 'locations/items',
      creditCardData: 'creditCard/items',
      creditCardDataCount: 'creditCard/itemsCount',
    }),
  },
  async created() {
    await this.$store.dispatch('toolbar/setTitle', 'Оформление заказа');
    this.user = await api.me();
    this.locationAddressName = await head(this.locationItems).addressName || null;
  },
  methods: {
    removeAddress(addressName) {
      this.$store.dispatch('locations/remove', addressName);
      this.locationAddressName = null;
    },
    setLocation(locations) {
      this.$store.dispatch('locations/setLocation', locations);
      this.isBottomSheetOpen = false;
    },
    locationChanged(location) {
      this.locationAddressName = location;
    },
    onSubmitOrder() {
      if (this.locationAddressName !== null) {
        this.locationError = true;
        this.$store.dispatch('checkout/addOrder', {
          address: this.locationAddressName,
          paymentType: this.paymentType,
          userName: this.user.name,
          userPhone: this.user.phone,
          userId: 415,
        });
        this.$router.push({ name: 'products-preview' });
      }
    },
  },
};
// end: Azimjon Toirov
</script>
