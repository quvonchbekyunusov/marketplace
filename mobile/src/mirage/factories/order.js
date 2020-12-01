import { association, Factory } from 'miragejs';
import random from '@/mirage/random';

export default Factory.extend({
  contactName() {
    return random.chance.name();
  },

  contactPhone() {
    return random.chance.phone();
  },

  shipmentAddress() {
    return {
      coordinates: {
        lat: 41.3163905,
        lng: 69.2307761,
      },
      place: 'ChIJd8BlQ2BZwokRAFUEcm_qrcA',
    };
  },

  status() {
    const statuses = ['rejected', 'delivered', 'in-progress'];
    return random.chance.pickone(statuses);
  },

  paymentType() {
    return random.paymentType();
  },

  comment() {
    return random.chance.sentence();
  },

  user: association(),

  createdAt() {
    const now = Date.now();
    const monthAgo = now - 30 * 24 * 60 * 60 * 1_000;
    return random.chance.integer({ min: monthAgo, max: now });
  },

  afterCreate(order, server) {
    // if (!order.user) {
    //   const allUsers = server.schema.users.all();
    //   const randomUser = random.chance.pickone(allUsers.models);
    //
    //   order.update('user', randomUser);
    // }

    if (!order.items.length) {
      const orderItemsCount = random.chance.integer({ min: 1, max: 10 });
      order.update('items', server.createList('order-item', orderItemsCount));
    }
  },
});
