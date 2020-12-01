import { Factory } from 'miragejs';
import random from '@/mirage/random';

export default Factory.extend({
  name() {
    return random.chance.company();
  },

  logo() {
    return random.logo();
  },
});
