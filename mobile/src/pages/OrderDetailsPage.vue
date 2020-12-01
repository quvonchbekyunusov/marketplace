<template>
  <div class="q-pa-md q-gutter-sm">
    <div id="container">
      <div class="column q-my-lg">
        <p class="text-grey-9 text-subtitle1 text-weight-medium ">
          <q-icon color="grey" size="sm" name="event_note" />
          Дата доставки
        </p>
        <div class="row justify-between q-pl-lg q-pr-sm q-mt-xs">
          <p
            class="text-body2 text-grey-7 text-weight-regular"
          >
            Договорная
          </p>
          <!--            Получено-->
          <!--          </p>-->
          <!--          <p class="text-primary text-weight-thin text-body2">-->
        </div>
      </div>
      <div class="column q-my-lg">
        <p class="text-grey-8 text-subtitle1 text-weight-medium ">
          <q-icon color="grey" size="sm" name="location_on" />
          Адрес доставки
        </p>
        <div class="row justify-between q-pl-lg q-pr-sm  q-mt-xs">
          <p
            class="text-body2 text-grey-7"
          >
            <!--            {{ order.shipmentAddress }}-->
            город Ташкент, 9A ул. Сухайл, Тошкент 100027
          </p>
        </div>
      </div>
      <div class="column q-my-lg ">
        <p class="text-grey-8 text-subtitle1 text-weight-medium">
          <q-icon color="grey" size="sm" name="payment" />
          Общая сумма
        </p>
        <div class="row justify-between q-pl-lg q-pr-sm q-mt-xs">
          <p
            class="text-body2 text-grey-7 text-weight-regular"
          >
            Товары <span>({{ order.items.length }})</span>
          </p>
          <p class=" text-body2 text-grey-8">
            {{ $n(order.totalPrice, 'currency') }}
          </p>
        </div>
        <div class="row justify-between q-pl-lg q-mt-xs q-pr-sm">
          <p
            class="text-body2 text-grey-7 text-weight-regular"
          >
            доставкa
          </p>
          <p v-if="deliveryPrice === 0" class=" text-body2 text-grey-8">
            бесплатно
          </p>
          <p v-else>
            {{ $n(deliveryPrice, 'currency') }}
          </p>
        </div>
      </div>
      <q-separator inset />
      <div class="row justify-between q-pl-lg q-my-md text-body1 text-primary text-weight-bold q-pr-sm">
        <p>Итого</p>
        <p>{{ $n(order.totalPrice + deliveryPrice, 'currency') }}</p>
      </div>
      <div class="column q-my-lg">
        <p class="text-grey-9 text-subtitle1 text-weight-medium">
          <q-icon color="grey" size="sm" name="person" />
          Получатель
        </p>
        <div
          class="
        column
        q-pl-lg
        q-pr-sm
        q-mt-xs
        text-body2
        text-grey-7
        text-weight-regular"
        >
          <p>Имя: {{ order.contactName }}</p>
          <p>Номер: {{ order.contactPhone }}</p>
        </div>
      </div>
      <q-separator inset class="q-my-lg" />
      <q-card class="q-pb-xs">
        <z-order-block-body :status="order.status" :images="images" class="q-px-md" />
        <div class="q-pa-sm q-my-sm row justify-between">
          <p class="amount">
            Количество: {{ order.items.length }}
          </p>
          <p class="text-primary text-body2">
            {{ $n(order.totalPrice, 'currency') }}
          </p>
        </div>
        <q-btn
          label="состав заказа"
          color="primary"
          outline
          class="flex content-center q-my-md q-mx-auto text-capitalize"
          @click="open"
        />
      </q-card>
      <z-bottom-sheet v-model="dialog">
        <template #default>
          <q-card
            v-for="item in order.items "
            :key="item.id"
            v-touch-swipe.down="lastScrollPosition === 0 ? hide: null"
            class="items-center no-wrap q-py-none"
            flat
          >
            <q-card-section>
              <z-order-list-item :offer="item.offer" />
            </q-card-section>
          </q-card>
        </template>

        <template #bottom>
          <div class="row justify-between q-pa-lg text-body1 text-weight-bold text-primary q-mb-md">
            <p>{{ order.items.length }}</p>
            <p>{{ $n(order.totalPrice, 'currency') }}</p>
          </div>
        </template>
      </z-bottom-sheet>
    </div>
  </div>
</template>

<script>
import ZOrderListItem from '@/components/ZOrderListItem';
import ZOrderBlockBody from '@/components/ZOrderBlockBody';
import ZBottomSheet from '@/components/ZBottomSheet';
import api from '@common/api';
import { sumBy } from 'lodash-es';
import VueTypes from 'vue-types';

export default {
  name: 'OrderDetailsPage',
  components: {
    ZOrderListItem,
    ZOrderBlockBody,
    ZBottomSheet,
  },
  props: {
    orderId: VueTypes.id.isRequired,
  },
  data() {
    return {
      dialog: false,
      deliveryPrice: 0,
      images: null,
      fullHeight: false,
      order: null,
    };
  },
  async created() {
    this.order = await this.fetchOrder(this.orderId);
    this.images = await this.order.items.map((item) => item.offer.product.images[0]);
  },
  methods: {
    open() {
      this.dialog = true;
    },
    hide() {
      this.dialog = false;
    },
    async fetchOrder(id) {
      const order = await api.orders.one(id);
      const items = await this.fetchItems(order.items);
      return {
        ...order,
        // shipmentAddress: await this.formattedAddress(order.shipmentAddress.place),
        items,
        totalPrice: sumBy(items, (item) => item.offer.price.value * item.quantity),
      };
    },
    async fetchItems(ids) {
      let items = await api.orderItems.multiple(ids);
      items = await Promise.all(items.map(async (item) => ({
        ...item,
        offer: await this.fetchOffer(item.offer),
      })));
      return items;
    },
    async fetchOffer(id) {
      const offer = await api.offers.one(id);
      return {
        ...offer,
        seller: await api.sellers.one(offer.seller),
        product: await api.products.one(offer.product),
      };
    },
    // async formattedAddress(placeId) {
    //   const apikey = 'AIzaSyBkxS5l87lclaC6MIWSGejdCXL13wSShRo';
    //   const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apikey}`);
    //   return response.data.result.formatted_address;
    // },
  },
};
</script>

<style scoped>
  .amount {
    font-size: 14px;
    line-height: 16px;
    color: #828282;
  }
</style>
