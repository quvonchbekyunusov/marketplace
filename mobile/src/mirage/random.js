import Chance from 'chance';

const chance = new Chance(666);

const LOGOS_COUNT = 15;
const PAYMENT_TYPES = ['cash', 'uzcard', 'humo', 'payme', 'oson'];
const PICSUM_URL = 'https://picsum.photos';

let picsumId = 0;

export default {
  chance,

  picsum(width, height) {
    return `${PICSUM_URL}/seed/${picsumId++}/${width}/${height}`;
  },

  logo() {
    return `/mock/logos/logo-${this.chance.integer({ min: 1, max: LOGOS_COUNT })}.svg`;
  },

  icon() {
    return 'star_outline';
  },

  paymentType() {
    return this.chance.pickone(PAYMENT_TYPES);
  },
};
