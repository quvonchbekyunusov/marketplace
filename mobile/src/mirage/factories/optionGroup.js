import { Factory } from 'miragejs';

export default Factory.extend({
  name(i) {
    return `Option group ${i}`;
  },

  afterCreate(optionGroup, server) {
    if (optionGroup.options.length === 0) {
      optionGroup.update('options', server.createList('option', 3));
    }
  },
});
