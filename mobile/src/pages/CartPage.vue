<template>
  <q-page>
    <!-- start: Azimjon Toirov 09.10.2020 -->
    <div v-if="items.length > 0" class="flex column justify-center">
      <hr class="q-mt-md">
      <div class="q-px-md flex justify-between full-width">
        <p class="text-h6 text-weight-bold">
          Всего {{ $n(items.length, 'humanize') }}
        </p>
        <q-btn
          icon="far fa-trash-alt"
          color="grey"
          class="float-right q-mr-sm"
          flat
          dense
          size="md"
          @click="clearCart"
        />
      </div>
      <z-cart-card v-for="{ offerId } in items" :key="offerId" :offer-id="offerId" />
      <!-- end: Azimjon Toirov -->
      <!-- start: Doniyor Raxmonov -->
      <q-card class="q-mx-md q-mb-lg flex column">
        <div class="flex justify-between q-pt-sm">
          <div class="q-ml-sm title">
            Общая сумма :
          </div>
          <div class="q-mx-sm  title">
            {{ $n(computedSum,'currency') }}
          </div>
        </div>
        <!--        <div class="discount flex justify-between">-->
        <!--          <div class="q-mx-sm title">-->
        <!--            Скидки :-->
        <!--          </div>-->
        <!--          <div class="q-mx-sm title">-->
        <!--            {{ $n(computedDiscounts,'currency') }}-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="q-mx-auto shadow-1" style="width: 95%">
          <q-separator />
        </div>
        <div class="overall flex justify-between">
          <div class="q-ml-sm titleMain">
            Итого :
          </div>
          <div class="q-mr-sm titleMain">
            {{ $n((computedSum),'currency') }}
          </div>
        </div>
      </q-card>
      <q-btn
        label="Перейти к офрмлению"
        :to="{ name: 'checkout' }"
        color="primary"
        class="btn q-mx-auto q-mb-xl submit-btn"
        no-caps
      />
    </div>
    <!-- end: Doniyor Raxmonov -->
    <!-- start: Azimjon Toirov 09.10.2020 -->
    <z-empty-state
      v-else
      :content="{
        image: require('../assets/emptystate/undraw_empty_cart_co35 1.png'),
        ratio: 5 / 3,
        title: 'Ваша корзина пуста',
        body: 'Начните свой шоппинг вместе с нами!',
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
    <!-- end: Azimjon Toirov -->
  </q-page>
</template>

<script>

import api from '@common/api';
import ZCartCard from '@/components/ZCartCard';
import ZEmptyState from '@/components/ZEmptyState';
import { mapGetters } from 'vuex';

export default {
  name: 'CartPage',
  components: {
    ZEmptyState,
    ZCartCard,
  },
  data() {
    return {
      offer: null,
      product: null,
      seller: null,
      sum: [],
      discount: [],
    };
  },
  computed: {
    ...mapGetters('cart', ['items']),
    ...mapGetters('auth', ['isAuthorized']),
    computedSum() {
      let allSum = 0;
      this.sum.forEach((o) => {
        allSum += (o.price);
      });
      return allSum;
    },
    computedDiscounts() {
      let allSum = 0;
      this.discount.forEach((o) => {
        allSum += (o.discount);
      });
      return allSum;
    },
  },
  // start: Azimjon Toirov 09.10.2020
  watch: {
    items: {
      handler(val) {
        val.forEach(async (obj) => {
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
        });
      },
      immediate: true,
      deep: true,
    },
  },
  // end: Azimjon Toirov
  created() {
    this.$store.dispatch('toolbar/setTitle', 'Корзина');
  },
  methods: {
    async updateOffers() {
      this.isLoading = true;
      if (!this.offers || this.offers.length !== this.items.length) {
        this.offers = await Promise.all(this.items.map(async ({ offerId }) => api.offers.one(offerId)));
      }
      this.isLoading = false;
    },
    // start  | Doniyor Raxmonov | 10/26/2020
    async getOfferPrice(id, count) {
      const offer = (await api.one('catalog', id)).data;
      return offer.price * count;
    },
    async getOfferDiscount(id) {
      const offer = (await api.one('catalog', id)).data;
      if (offer.hasOwnProperty('oldPrice')) {
        return offer.oldPrice - offer.price;
      }
      return 0;
    },
    // end  | Doniyor Raxmonov | 10/26/2020
    // start: Azimjon Toirov 09.10.2020
    clearCart() {
      this.$q.dialog({
        title: 'Удалить',
        message: 'Вы действительно хотите удалить ?',
        cancel: true,
        color: 'primary',
        persistent: true,
      }).onOk(() => {
        this.$store.dispatch('cart/clear');
      }).onCancel(() => {
        console.log('>>>> Cancelled');
      });
    },
    // end: Azimjon Toirov
  },
};
</script>

<style scoped>
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

  .btn {
    width: 70%;
  }

  .submit-btn {
    width: 90%;
  }
</style>
