<template>
  <q-page>
    <!-- start: Azimjon Toirov 09.10.2020 -->
    <div v-if="isLoading" class="row justify-center q-pa-xl">
      <q-spinner size="sm" color="primary" />
    </div>
    <!-- end: Azimjon Toirov -->
    <div v-else>
      <!--start: Aziz Rozmetov-->
      <div class="q-pa-md q-mx-auto" style="max-width: 350px">
        <q-list bordered separator>
          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label class="text-subtitle1 flex">
                <p class="text-bold q-mr-sm">
                  Адресс доставки:
                </p>
                {{ checkoutItems.address.addressName }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label class="text-subtitle1 flex">
                <p class="text-bold q-mr-sm">
                  Способ оплаты:
                </p>
                {{ checkoutItems.paymentType }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label class="text-subtitle1 flex">
                <p class="text-bold q-mr-sm">
                  Имя заказчика:
                </p>
                {{ checkoutItems.userName }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label class="text-subtitle1 flex">
                <p class="text-bold q-mr-sm">
                  Номер заказчика:
                </p>
                {{ checkoutItems.userPhone }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <!--end: Aziz Rozmetov-->
      <!-- start: Azimjon Toirov 09.10.2020 -->
      <z-checkout-items-card v-for="{ offerId } in cardItems" :key="offerId" :offer-id="offerId" />

      <q-card class="q-my-md flex column content-center">
        <div class="sum flex justify-between q-pt-sm">
          <div class="q-ml-sm title">
            Общая сумма :
          </div>
          <div class="q-mx-sm  title">
            {{ $n(computedSum,'currency') }}
          </div>
        </div>
        <!--<div class="discount flex justify-between">
          <div class="q-mx-sm title">
            Скидки :
          </div>
          <div class="q-mx-sm title">
            {{ $n(computedDiscounts,'currency') }}
          </div>
        </div>-->
        <div class="discount flex justify-between">
          <div class="q-mx-sm title">
            Сумма доставки :
          </div>
          <div class="q-mx-sm title">
            {{ $n(deliveryPrice,'currency') }}
          </div>
        </div>
        <div class="overall flex justify-between">
          <div class="q-ml-sm titleMain">
            Итого :
          </div>
          <div class="q-mr-sm titleMain">
            {{ $n((computedSum + deliveryPrice),'currency') }}
          </div>
        </div>
      </q-card>
      <div
        class="q-ma-lg"
      >
        <q-btn
          label="Заказать"
          unelevated
          color="primary"
          class="full-width"
          @click="createOrder"
        />
      </div>
    </div>
    <!-- end: Azimjon Toirov -->
  </q-page>
</template>

<script>
// start: Azimjon Toirov 09.10.2020
import { mapGetters } from 'vuex';
import ZCheckoutItemsCard from '@/components/ZCheckoutItemsCard';
import api from '@common/api';
import axios from 'axios';

export default {
  name: 'ProductsPreviewPage',
  components: {
    ZCheckoutItemsCard,
  },
  data() {
    return {
      discount: [],
      sum: [],
      items: [],
      locationData: [],
      deliveryPrice: 120000,
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters({
      cardItems: 'cart/items',
      cardItemsCount: 'cart/itemsCount',
      checkoutItems: 'checkout/items',
      locations: 'locations/items',
    }),
    computedSum() {
      let allSum = 0;
      this.sum.forEach((o) => {
        allSum += (o.price);
      });
      return allSum;
    },
    /* computedDiscounts() {
      let allSum = 0;
      this.discount.forEach((o) => {
        allSum += (o.discount);
      });
      return allSum;
    }, */
  },
  async created() {
    await this.$store.dispatch('toolbar/setTitle', 'Подтверждения заказа');
    this.cardItems = await Promise.all(this.cardItems.map(async (obj) => {
      const price = await this.getOfferPrice(obj.offerId, obj.quantity);
      const discount = await this.getOfferDiscount(obj.offerId);
      if (discount) {
        if (this.discount.some((o) => o.id === obj.offerId)) {
          this.discount = [];
        }
        this.discount.push({
          id: obj.offerId,
          discount,
        });
      }
      if (this.sum.some((o) => o.id === obj.offerId)) {
        this.sum = [];
      }
      this.sum.push({
        id: obj.offerId,
        price,
      });
    }));
    this.locationData = this.locations
      .filter((location) => location.addressName !== this.checkoutItems.address.addressName);
    this.isLoading = false;
    console.log(this.locationData);
  },
  methods: {
    async getOfferPrice(id, count) {
      const { data: offer } = await api.one('catalog', id);
      return offer.price * count;
    },
    async getOfferDiscount(id) {
      const offer = await api.one('catalog', id);
      if (offer.hasOwnProperty('oldPrice')) {
        return offer.oldPrice - offer.price;
      }
      return 0;
    },
    async createOrder() {
      axios({
        method: 'POST',
        url: 'http://market.zetsoft.uz/api/shop/orders/save-order-vue.aspx',
        data: {
          userData: this.checkoutItems,
          items: this.cardItems,
        },
      })
        .then((response) => {
          console.log(response);
        });
      // await api.create('order', { ...this.locationData, items: this.cardItems });
      // await fetch('http://market.zetsoft.uz/api/shop/orders/save-order-vue.aspx', {
      //   userData: this.locationData,
      //   items: this.cardItems,
      // });
      // await this.$router.push({ name: 'order-completed' });
      // await this.$store.dispatch('cart/clear');
    },
  },
};
// end: Azimjon Toirov
</script>

<style lang="scss" scoped>
  /* start: Aziz Rozmetov */
  .title {
    color: #999999;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    margin-bottom: .5rem;
  }

  .titleMain {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: #333333;
  }

  /* end: Aziz Rozmetov */

</style>
