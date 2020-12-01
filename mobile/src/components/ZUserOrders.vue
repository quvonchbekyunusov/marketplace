<template>
  <div class="q-my-md">
    <div v-if="isLoading" class="full-height flex flex-center">
      <q-spinner color="primary" size="lg" />
    </div>
    <div v-else>
      <z-order-block />
    </div>
  </div>
</template>

<script>
import api from '@common/api';
import { groupBy, uniq } from 'lodash-es';
import axios from 'axios';
import ZOrderBlock from '@/components/ZOrderBlock';

export default {
  name: 'ZUserOrders',
  components: {
    ZOrderBlock,
  },
  data() {
    return {
      isLoading: true,
      orders: null,
      orderItems: null,
      offers: null,
      brands: null,
      sellers: null,
      products: null,
      options: null,
      optionss: null,
      optionGroups: null,
      filledOrders: null,
      test: null,
    };
  },
  async created() {
    console.log('created is starteed');
    this.isLoading = false;
    this.orders = await api.orders.all();
    this.orderItems = await api.orderItems.multiple(this.orders.flatMap((order) => order.items));
    this.offers = await api.offers.multiple(this.orderItems.flatMap((item) => item.offer));
    this.products = await api.products.multiple(this.offers.map(({ product }) => product));
    this.sellers = await api.sellers.multiple(this.offers.map(({ seller }) => seller));
    this.brands = await api.brands.multiple(this.products.map(({ brand }) => brand));
    this.optionss = uniq(this.offers.flatMap(({ options }) => options));
    this.options = await api.options.multiple(this.optionss);
    this.optionGroups = await api.optionGroups.multiple(this.options.flatMap(({ group }) => group));
    this.filledOrders = await Promise.all(this.orders.map(this.filledOrder));
    // this.isLoading = false;
    // console.log(this.isLoading);
  },
  methods: {
    async filledOrder(order) {
      const items = this.filledOrderItems(order.items);
      return {
        ...order,
        totalCost: Object.values(items).flat().reduce((sum, { totalPrice }) => sum + totalPrice, 0),
        shipmentAddress: await this.formattedAddress(order.shipmentAddress.place),
        items,
      };
    },

    filledOrderItems(orderItemIds) {
      const orderItems = orderItemIds.map((orderItemId) => {
        const orderItem = this.orderItems.find(({ id }) => id === orderItemId);
        const offer = this.filledOffer(orderItem.offer);

        return {
          ...orderItem,
          offer,
          totalPrice: offer.price * orderItem.quantity,
        };
      });

      return groupBy(orderItems, 'offer.seller.id');
    },

    filledOffer(offerId) {
      const offer = this.offers.find(({ id }) => id === offerId);
      return {
        ...offer,
        product: this.products.find(({ id }) => id === offer.product),
        seller: this.sellers.find(({ id }) => id === offer.seller),
        options: this.options.filter(({ id }) => offer.options.includes(id)).map(this.filledOption),
      };
    },

    filledOption(option) {
      return {
        ...option,
        group: this.optionGroups.find(({ id }) => id === option.group),
      };
    },

    async formattedAddress(placeId) {
      const apikey = 'AIzaSyBkxS5l87lclaC6MIWSGejdCXL13wSShRo';
      const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apikey}`);
      return response.data.result.formatted_address;
    },
  },
};
</script>
