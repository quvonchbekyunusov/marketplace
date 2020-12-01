import { Factory } from 'miragejs';
import random from '@/mirage/random';

export default Factory.extend({
  name() {
    return random.chance.name();
  },

  email() {
    return random.chance.email();
  },

  password() {
    return random.chance.string({ length: 8 });
  },

  phone() {
    return random.chance.phone({ formatted: false });
  },

  avatar() {
    return random.chance.avatar({ protocol: 'https' });
  },
});
