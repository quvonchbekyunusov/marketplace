import { filter, map, sumBy, zip } from 'lodash-es';
import api from '../api';

class SalesCountApi {
  async categories({ ids }) {
    const { data: products } = await api.all('product', {
      filter: {
        category: ids,
      },
      fields: ['id', 'category'],
    });

    const productSalesCount = await this.products({ ids: map(products, 'id') });

    const productSalesCountPairs = zip(products, productSalesCount);

    return ids.map(
      (id) => {
        const categorySalesCountPairs = filter(productSalesCountPairs, ['0.category', id]);
        return sumBy(categorySalesCountPairs, '1');
      },
    );
  }

  async category({ id }) {
    return (await this.categories({ ids: [id] }))[0];
  }

  async brands({ ids }) {
    const { data: products } = await api.all('product', {
      filter: {
        brand: ids,
      },
      fields: ['id', 'brand'],
    });

    const productSalesCount = await this.products({ ids: map(products, 'id') });

    const productSalesCountPairs = zip(products, productSalesCount);

    return ids.map(
      (id) => {
        const brandSalesCountPairs = filter(productSalesCountPairs, ['0.brand', id]);
        return sumBy(brandSalesCountPairs, '1');
      },
    );
  }

  async brand({ id }) {
    return (await this.brands({ ids: [id] }))[0];
  }

  async products({ ids }) {
    const { data: elements } = await api.all('element', {
      filter: { product: ids },
      fields: ['id', 'product'],
    });

    const elementSalesCount = await this.elements({ ids: map(elements, 'id') });

    const elementSalesCountPairs = zip(elements, elementSalesCount);

    return ids.map(
      (id) => {
        const productSalesCountPairs = filter(elementSalesCountPairs, ['0.product', id]);
        return sumBy(productSalesCountPairs, '1');
      },
    );
  }

  async product({ id }) {
    return (await this.products({ ids: [id] }))[0];
  }

  async elements({ ids }) {
    const { data: catalogs } = await api.all('catalog', {
      filter: { element: ids },
      fields: ['id', 'element'],
    });

    const catalogSalesCount = await this.catalogs({ ids: map(catalogs, 'id') });

    const catalogSalesCountPairs = zip(catalogs, catalogSalesCount);

    return ids.map(
      (id) => {
        const elementSalesCountPairs = filter(catalogSalesCountPairs, ['0.element', id]);
        return sumBy(elementSalesCountPairs, '1');
      },
    );
  }

  async element({ id }) {
    return (await this.elements({ ids: [id] }))[0];
  }

  // eslint-disable-next-line class-methods-use-this
  async catalogs({ ids }) {
    const { data: orderItems } = await api.all('order-item', {
      filter: { catalog: ids },
      fields: ['catalog', 'quantity'],
    });

    return ids.map(
      (id) => {
        const catalogsOrderItems = filter(orderItems, ['catalog', id]);
        return sumBy(catalogsOrderItems, 'quantity');
      },
    );
  }

  async catalog({ id }) {
    return (await this.catalogs({ ids: [id] }))[0];
  }
}

export default new SalesCountApi();
