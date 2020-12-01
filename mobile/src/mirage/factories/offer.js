import { association, Factory, trait } from 'miragejs';
import random from '@/mirage/random';
import { groupBy } from 'lodash-es';

export default Factory.extend({
  quantity() {
    return random.chance.integer({ min: 0, max: 1000 });
  },

  price() {
    return {
      value: random.chance.integer({ min: 10, max: 1500 }) * 1_000,
    };
  },

  product: association(),

  seller: association(),

  discounted: trait({
    price() {
      const oldPrice = random.chance.integer({ min: 11, max: 1500 });
      return {
        old: oldPrice * 1_000,
        value: random.chance.integer({ min: 10, max: oldPrice - 1 }) * 1_000,
      };
    },
  }),

  afterCreate(offer, server) {
    if (!offer.options.length) {
      const options = offer.product.options.models;
      const optionsByGroup = groupBy(options, 'groupId');
      const randomOptions = Object.values(optionsByGroup).map(random.chance.pickone.bind(random.chance));

      offer.update('options', randomOptions);
    }

    if (!offer.reviews.length) {
      const reviews = server.createList('review', 3, { offer });
      offer.update('reviews', reviews);
    }
  },
});
