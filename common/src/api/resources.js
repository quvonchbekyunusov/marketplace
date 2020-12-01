import Resource from './core/Resource';
import ResourceTransformer from './core/ResourceTransformer';
import ResourceMap from './core/ResourceMap';

const resources = {
  brand: {
    rawName: 'shop-brand',
    schema: {
      attrs: ['id', 'name', 'logo'],
    },

    transformer: {
      logo: {
        rawField: 'image',

        fromRaw(image, rawResource) {
          if (!image) {
            return '/no-image.png';
          }

          const logo = image[0];

          if (!logo) {
            return '/no-image.png';
          }

          const isAbsolute = logo.startsWith('http://') || logo.startsWith('https://');

          return isAbsolute ? logo : `http://market.zetsoft.uz/uploaz/market/ShopBrand/${this.rawField}/${rawResource.id}/${logo}`;
        },

        toRaw(logo) {
          const isAbsolute = logo.startsWith('http://') || logo.startsWith('https://');

          if (!isAbsolute) {
            throw new Error(`Brand logo url must be absolute - ${logo}`);
          }

          return [logo];
        },
      },
    },
  },

  category: {
    rawName: 'shop-category',

    schema: {
      attrs: ['id', 'icon', 'name', 'image'],
      relationships: {
        brands: ['brand'],
        parent: 'category',
      },
    },

    transformer: {
      parent: 'parent_id',

      image: {
        rawField: 'image',

        fromRaw(image, rawResource) {
          if (!image) {
            return '/no-image.png';
          }

          const logo = image[0];

          if (!logo) {
            return '/no-image.png';
          }

          const isAbsolute = logo.startsWith('http://') || logo.startsWith('https://');

          return isAbsolute ? logo : `http://market.zetsoft.uz/uploaz/market/ShopCategory/${this.rawField}/${rawResource.id}/${logo}`;
        },

        toRaw(logo) {
          const isAbsolute = logo.startsWith('http://') || logo.startsWith('https://');

          if (!isAbsolute) {
            throw new Error(`Brand logo url must be absolute - ${logo}`);
          }

          return JSON.stringify([logo]);
        },
      },

      brands: {
        rawField: 'shop_brand_ids',

        fromRaw(brandIds) {
          if (!brandIds) {
            return [];
          }

          return brandIds;
        },

        toRaw(brandIds) {
          return JSON.stringify(brandIds);
        },
      },
    },
  },

  seller: {
    rawName: 'user-company',

    baseValues: {
      type: 'market',
    },

    schema: {
      attrs: ['id', 'logo', 'name'],
    },

    transformer: {
      logo: {
        rawField: 'photo',

        fromRaw(photo, rawResource) {
          if (!photo) {
            return '/no-image.png';
          }

          const logo = photo[0];

          if (!logo) {
            return '/no-image.png';
          }

          const isAbsolute = logo.startsWith('http://') || logo.startsWith('https://');

          return isAbsolute ? logo : `http://market.zetsoft.uz/uploaz/market/UserCompany/photo/${rawResource.id}/${logo}`;
        },

        toRaw(logo) {
          const isAbsolute = logo.startsWith('http://') || logo.startsWith('https://');

          if (!isAbsolute) {
            throw new Error(`Seller logo url must be absolute - ${logo}`);
          }

          return [logo];
        },
      },
    },
  },

  product: {
    rawName: 'shop-product',

    schema: {
      attrs: ['id', 'name', 'images', 'description'],
      relationships: {
        brand: 'brand',
        category: 'category',
        options: ['option'],
      },
    },

    transformer: {
      images: {
        rawField: 'image',
        fromRaw(images, rawResource) {
          if (!images) {
            return ['/no-image.png'];
          }

          return images.map((image) => `http://market.zetsoft.uz/uploaz/market/ShopProduct/image/${rawResource.id}/${image}`);
        },

        toRaw(images) {
          const isAbsolute = images.every((image) => image.startsWith('http://') || image.startsWith('https://'));

          if (!isAbsolute) {
            throw new Error(`Product image urls must be absolute - ${images}`);
          }

          return [images];
        },
      },
      category: {
        rawField: 'shop_category_id',

        fromRaw(id) {
          return Number(id);
        },

        toRaw(id) {
          return id.toString();
        },
      },
      brand: 'shop_brand_id',
      options: {
        rawField: 'shop_option_ids',
        fromRaw(optionIds) {
          if (!optionIds) {
            return [];
          }

          return optionIds;
        },
      },
      description: 'text',
    },
  },
  // start|Axrorbek|Nisonboyev|2020-10-09

  catalog: {
    rawName: 'shop-catalog',

    schema: {
      attrs: ['id', 'quantity', 'name', 'price', 'oldPrice'],
      relationships: {
        seller: 'seller',
        element: 'element',
      },
    },

    transformer: {
      oldPrice: 'price_old',
      seller: 'user_company_id',
      quantity: 'amount',
      description: 'title',
      element: 'shop_element_id',
    },
  },

  element: {
    rawName: 'shop-element',
    schema: {
      attrs: ['id', 'name'],
      relationships: {
        product: 'product',
        options: ['option'],
      },
    },

    transformer: {
      product: 'shop_product_id',
      options: {
        rawField: 'shop_option_ids',
        fromRaw(optionIds) {
          if (!optionIds) {
            return [];
          }

          return optionIds;
        },
      },
    },
  },

  option: {
    rawName: 'shop-option',
    schema: {
      attrs: ['id', 'name'],
      relationships: {
        type: 'option-type',
      },
    },
    transformer: {
      type: 'shop_option_type_id',
    },
  },

  'option-type': {
    rawName: 'shop-option-type',
    schema: {
      attrs: ['id', 'name'],
    },
  },

  review: {
    rawName: 'shop-review',
    schema: {
      attrs: ['id', 'body', 'rating'],
      relationships: {
        user: 'user',
        product: 'product',
      },
    },

    transformer: {
      product: 'shop_product_id',
      rating: {
        rawName: 'rating',
        fromRaw: Number,
      },
      user: 'user_id',
      body: 'text',
    },

    baseValues: {
      type: 'product',
    },
  },

  // end Axrorbek Nisonboyev

  // start|AxrorbekNisonboyev|2020-10-12
  order: {
    rawName: 'shop-order',
    schema: {
      attrs: ['id', 'user', 'date', 'contactPhone', 'contactName', 'paymentType', 'comment'],
      relationships: {
        user: 'user',
        shipmentAddress: 'place',
      },
    },
    transformer: {
      user: 'user_id',
      contactName: 'contact_name',
      contactPhone: 'contact_phone',
      comment: 'comment_user',
      shipmentAddress: 'place_adress_id',
      paymentType: 'payment_type',
    },
  },

  'order-item': {
    rawName: 'shop-order-item',
    schema: {
      attrs: ['id', 'quantity', 'partialQuantity', 'returnedQuantity', 'price', 'totalPrice', 'partialPrice', 'returnedPrice'],
      relationships: {
        catalog: 'catalog',
        order: 'order',
      },
    },
    transformer: {
      order: 'shop_order_id',
      catalog: 'shop_catalog_id',
      quantity: 'amount',
      partialQuantity: 'amount_partial',
      returnedQuantity: 'amount_return',
      partialPrice: 'price_all_partial',
      returnedPrice: 'price_all_return',
    },
  },

  'place-address': {
    rawName: 'place-adress',
    schema: {
      attrs: ['id'],
    },
  },

  user: {
    rawName: 'user',
    schema: {
      attrs: ['id', 'name', 'avatar', 'email', 'phone', 'role'],
    },
    transformer: {
      avatar: 'photo',
      name: 'title',
    },
    baseValue: {
      role: 'client',
    },
  },
  // end|AxrorbekNisonboyev|2020-10-12
};

const Resources = new Map(
  Object.entries(resources).map(([name, definition]) => [name, new Resource(name, definition.schema)]),
);

const ResourcesMapper = new ResourceMap(
  Object.fromEntries(
    Object.entries(resources)
      .map(([name, definition]) => [name, definition.rawName]),
  ),
);

const Transformers = new Map(
  Object.entries(resources)
    .map(([name, definition]) => [name, new ResourceTransformer(Resources.get(name), definition.transformer)]),
);

const BaseValues = new Map(
  Object.entries(resources).map(([name, definition]) => [name, definition.baseValues || {}]),
);

const ResponseNormalizers = new Map(
  Object.entries(resources).map(([name, definition]) => [name, definition.normalizer || {}]),
);

export { Resources, ResourcesMapper as ResourceMap, Transformers, BaseValues, ResponseNormalizers };
