import { association, Factory } from 'miragejs';
import random from '@/mirage/random';

export default Factory.extend({
  quantity() {
    return random.chance.integer({ min: 1, max: 5 });
  },

  createdAt() {
    const now = Date.now();
    const monthAgo = now - 30 * 24 * 60 * 60 * 1_000;
    return random.chance.integer({ min: monthAgo, max: now });
  },

  offer: association(),
});
