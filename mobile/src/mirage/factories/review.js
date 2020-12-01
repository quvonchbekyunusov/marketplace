import { Factory, association } from 'miragejs';
import random from '@/mirage/random';

export default Factory.extend({
  user: association(),

  offer: association(),

  rating() {
    return random.chance.integer({ min: 0, max: 5 });
  },

  body() {
    return random.chance.paragraph();
  },
});
