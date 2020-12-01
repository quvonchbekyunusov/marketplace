<template>
  <q-page class="q-mt-md">
    <z-order-search />
    <div class="flex column reverse">
      <div v-for="order in orders" :key="order.id">
        <z-order-block :order="order" />
      </div>
    </div>
  </q-page>
</template>

<script>
import ZOrderBlock from '@/components/ZOrderBlock';
import ZOrderSearch from '@/components/ZOrderSearch';
import { sumBy } from 'lodash-es';
import api from '@common/api';

export default {
  name: 'UserOrdersPage',
  components: {
    ZOrderBlock,
    ZOrderSearch,
  },

  data() {
    return {
      orders: null,
    };
  },
  async created() {
    this.$store.dispatch('toolbar/setTitle', 'Мои заказы');
    this.orders = await this.fetchOrders();
  },

  methods: {
    async fetchOrders() {
      let orders = await api.orders.all();
      orders = await Promise.all(orders.map(async (order) => {
        const items = await this.fetchItems(order.items);
        return ({
          ...order,
          items,
          totalPrice: sumBy(items, (item) => item.offer.price.value * item.quantity),
        });
      }));
      return orders;
    },

    async fetchItems(ids) {
      let orderItems = await api.orderItems.multiple(ids);
      orderItems = await Promise.all(orderItems.map(async (orderItem) => ({
        ...orderItem,
        offer: await this.fetchOffer(orderItem.offer),
      })));
      return orderItems;
    },

    async fetchOffer(id) {
      const offer = await api.offers.one(id);
      return {
        ...offer,
        product: await api.products.one(offer.product),
      };
    },
  },
};
</script>
