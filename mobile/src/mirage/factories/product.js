import random from '@/mirage/random';
import { association, Factory } from 'miragejs';

export default Factory.extend({
  name(i) {
    return `Product ${i + 1}`;
  },

  description() {
    return random.chance.paragraph();
  },

  images() {
    const imagesCount = random.chance.integer({ min: 1, max: 5 });
    const generator = () => random.picsum(900, 600);
    return random.chance.unique(generator, imagesCount);
  },

  category: association(),

  brand: association(),

  afterCreate(product, server) {
    if (!product.options.length) {
      product.update('options', server.createList('option', 3));
    }
  },
});
