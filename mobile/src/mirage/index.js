import { belongsTo, hasMany, Model, Server, Response } from 'miragejs';
import { chunk } from 'lodash-es';
import AppSerializer from './AppSerializer';
import IdentityManager from './IdentityManager';
import random from './random';
import * as factories from './factories';

export default new Server({
  serializers: {
    application: AppSerializer,
  },

  identityManagers: {
    application: IdentityManager,
  },

  models: {
    product: Model.extend({
      category: belongsTo(),
      options: hasMany(),
      brand: belongsTo(),
    }),

    optionGroup: Model.extend({
      options: hasMany({ inverse: 'group' }),
    }),

    option: Model.extend({
      group: belongsTo('option-group', { inverse: 'options' }),
    }),

    user: Model,

    brand: Model,

    category: Model.extend({
      parent: belongsTo('category', { inverse: 'subcategories' }),
      subcategories: hasMany('category', { inverse: 'parent' }),
      optionGroups: hasMany(),
      brands: hasMany(),
    }),

    order: Model.extend({
      user: belongsTo(),
      items: hasMany('order-item'),
    }),

    orderItem: Model.extend({
      offer: belongsTo(),
    }),

    seller: Model,

    offer: Model.extend({
      product: belongsTo(),
      options: hasMany(),
      seller: belongsTo(),
      reviews: hasMany(),
    }),

    review: Model.extend({
      user: belongsTo(),
      offer: belongsTo(),
    }),
  },

  factories,

  routes() {
    this.timing = 0;
    this.namespace = 'api';

    this.get('products');
    this.get('products/:id');

    this.get('option-groups');
    this.get('option-groups/:id');

    this.get('options');
    this.get('options/:id');

    this.get('brands');
    this.get('brands/:id');

    this.get('categories');
    this.get('categories/:id');

    this.get('sellers');
    this.get('sellers/:id');

    this.get('offers');
    this.get('offers/:id');

    this.get('reviews');
    this.get('reviews/:id');

    this.get('orders', (schema, request) => {
      if (!request.requestHeaders.Authorization) {
        return new Response(401);
      }

      const authString = atob(request.requestHeaders.Authorization.slice(6));
      const email = authString.slice(0, authString.indexOf(':'));
      const user = schema.users.findBy({ email });
      return schema.orders.where({ userId: user.id });
    });
    this.post('orders', (schema, request) => {
      if (!request.requestHeaders.Authorization) {
        return new Response(401);
      }

      const authString = atob(request.requestHeaders.Authorization.slice(6));
      const email = authString.slice(0, authString.indexOf(':'));

      const user = schema.users.findBy({ email });

      const attrs = JSON.parse(request.requestBody);
      attrs.user = user;
      attrs.items = attrs.items.map((orderItem) => schema.orderItems.create(orderItem));
      attrs.status = 'in-progress';
      return schema.orders.create(attrs);
    });
    this.get('orders/:id');

    this.get('order-items');
    this.get('order-items/:id');

    this.get('users');
    this.post('users', (schema, request) => {
      const attrs = JSON.parse(request.requestBody);

      if (schema.users.findBy({ email: attrs.email })) {
        return new Response(409, {}, { errors: ['User with the same email already exists'] });
      }

      return schema.create('user', attrs);
    });
    this.get('users/:id');

    this.get('me', (schema, request) => {
      if (!request.requestHeaders.Authorization) {
        return new Response(401);
      }

      const authString = atob(request.requestHeaders.Authorization.slice(6));
      const email = authString.slice(0, authString.indexOf(':'));
      const user = schema.users.findBy({ email });

      if (!user) {
        return new Response(404);
      }

      return user;
    });

    this.passthrough('https://cors-anywhere.herokuapp.com/*');
    this.passthrough('http://market.zetsoft.uz/rest/*');
  },

  seeds(server) {
    server.logging = false;

    const demoUser = server.create('user', {
      name: 'John Doe',
      email: 'demo@gmail.com',
      password: 'demopass',
    });

    const brands = server.createList('brand', random.chance.integer({ min: 3, max: 6 }));
    const optionGroups = server.createList('option-type', random.chance.integer({ min: 3, max: 10 }));
    const options = [];

    optionGroups.forEach((optionGroup) => {
      options.push(...optionGroup.options.models);
    });

    const grandCategories = server.createList('category', 10);
    const daddyCategories = grandCategories.flatMap((category) => {
      const result = server.createList('category', 3, { parent: category });
      category.update('subcategories', result);
      return result;
    });
    const childCategories = daddyCategories.flatMap((category) => {
      const result = server.createList('category', 3, {
        parent: category,
        brands,
        optionGroups,
      });
      category.update('subcategories', result);
      return result;
    });

    const sellers = server.createList('seller', 10);
    const products = [
      ...server.createList('product', random.chance.integer({
        min: 2,
        max: 6,
      }), {
        category: random.chance.pickone(childCategories),
        brand: random.chance.pickone(brands),
        options: random.chance.pickset(options, random.chance.integer({ min: 1, max: Math.floor(options.length / 2) })),
      }),

      ...server.createList('product', random.chance.integer({
        min: 2,
        max: 6,
      }), {
        category: random.chance.pickone(childCategories),
        brand: random.chance.pickone(brands),
        options: random.chance.pickset(options, random.chance.integer({ min: 1, max: Math.floor(options.length / 2) })),
      }),

      ...server.createList('product', random.chance.integer({
        min: 2,
        max: 6,
      }), {
        category: random.chance.pickone(childCategories),
        brand: random.chance.pickone(brands),
        options: random.chance.pickset(options, random.chance.integer({ min: 1, max: Math.floor(options.length / 2) })),
      }),
    ];

    let ordersCount = 0;
    sellers.forEach((seller, i) => {
      const sellerProducts = [products[i], products[products.length - 1 - i]];
      sellerProducts.forEach((product) => {
        const offers = server.createList('offer', random.chance.integer({ min: 1, max: 4 }), { product, seller });
        offers.push(...server.createList('offer', random.chance.integer({ min: 1, max: 4 }), {
          product,
          seller,
        }, 'discounted'));

        offers.forEach((offer) => {
          const now = Date.now();
          const monthAgo = now - 30 * 24 * 60 * 60 * 1_000;
          const createdAt = random.chance.integer({ min: monthAgo, max: now });

          const orderItems = server.createList('order-item', random.chance.integer({
            min: 5,
            max: 20,
          }), { offer, createdAt });

          chunk(orderItems, random.chance.integer({ min: 5, max: 10 })).forEach((orderItemsChunk) => {
            server.create('order', {
              user: ordersCount++ < 6 ? demoUser : server.create('user'),
              items: orderItemsChunk,
              createdAt,
            });
          });
        });
      });
    });
  },
});
