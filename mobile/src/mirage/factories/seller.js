import { Factory } from 'miragejs';
import random from '@/mirage/random';

export default Factory.extend({
  name() {
    return random.chance.company();
  },

  description() {
    return random.chance.paragraph();
  },

  logo() {
    return random.logo();
  },

  phone() {
    return random.chance.phone();
  },

  email() {
    return random.chance.email();
  },

  rating() {
    return random.chance.floating({ min: 0, max: 5 });
  },
});
