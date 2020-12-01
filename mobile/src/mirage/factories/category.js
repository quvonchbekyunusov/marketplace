import { Factory } from 'miragejs';
import random from '@/mirage/random';

export default Factory.extend({
  name(i) {
    return `Category ${i + 1}`;
  },

  icon() {
    return random.icon();
  },
});
