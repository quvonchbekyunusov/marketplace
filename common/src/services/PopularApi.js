import { constant, defaultTo, filter, map, maxBy, orderBy, take, zip } from 'lodash-es';
import api from '../api';
import SalesCountApi from './SalesCountApi';

const requiredFieldsInOptions = (options, fields) => {
  if (!options || !options.fields) {
    return;
  }

  const neededFields = fields.filter((field) => !options.fields.includes(field));
  options.fields.push(...neededFields);
};

class PopularApi {
  // eslint-disable-next-line class-methods-use-this
  async brands({ count, options }) {
    requiredFieldsInOptions(options, ['id']);

    const { data: brands } = await api.all('brand', options);

    const brandsSalesCount = await SalesCountApi.brands({
      ids: map(brands, 'id'),
    });

    const brandSalesCountPairs = zip(brands, brandsSalesCount);
    const filteredSalesCountPairs = brandSalesCountPairs.filter(([, salesCount]) => salesCount > 0);
    const orderedSalesCountPairs = orderBy(filteredSalesCountPairs, ['1'], ['desc']);

    return map(take(orderedSalesCountPairs, count), '0');
  }

  // eslint-disable-next-line class-methods-use-this
  async categories({ count, options }) {
    requiredFieldsInOptions(options, ['id', 'parent']);

    let { data: categories } = await api.all('category', options);

    categories = categories.filter(({ id }) => !categories.some(({ parent }) => defaultTo(parent?.id, parent) === id));

    const categoriesSalesCount = await SalesCountApi.categories({
      ids: map(categories, 'id'),
    });

    const categoriesSalesCountPairs = zip(categories, categoriesSalesCount);
    const filteredSalesCountPairs = categoriesSalesCountPairs.filter(([, salesCount]) => salesCount > 0);
    const orderedSalesCountPairs = orderBy(filteredSalesCountPairs, ['1'], ['desc']);

    return map(take(orderedSalesCountPairs, count), '0');
  }

  // eslint-disable-next-line class-methods-use-this
  async products({ count, options }) {
    requiredFieldsInOptions(options, ['id']);

    const { data: products } = await api.all('product', options);

    const productsSalesCount = await SalesCountApi.products({
      ids: map(products, 'id'),
    });

    const productsSalesCountPairs = zip(products, productsSalesCount);
    const filteredSalesCountPairs = productsSalesCountPairs.filter(([, salesCount]) => salesCount > 0);
    const orderedSalesCountPairs = orderBy(filteredSalesCountPairs, ['1'], ['desc']);

    return map(take(orderedSalesCountPairs, count), '0');
  }

  // eslint-disable-next-line class-methods-use-this
  async catalogs({ count, options }) {
    requiredFieldsInOptions(options, ['id']);

    const { data: catalogs } = await api.all('catalog', options);

    const catalogsSalesCount = await SalesCountApi.catalogs({
      ids: map(catalogs, 'id'),
    });

    const catalogsSalesCountPairs = zip(catalogs, catalogsSalesCount);
    const filteredSalesCountPairs = catalogsSalesCountPairs.filter(([, salesCount]) => salesCount > 0);
    const orderedSalesCountPairs = orderBy(filteredSalesCountPairs, ['1'], ['desc']);

    return map(take(orderedSalesCountPairs, count), '0');
  }

  // eslint-disable-next-line class-methods-use-this
  async productsCatalog({ products, options }) {
    requiredFieldsInOptions(options, 'id', 'element');

    const { data: elements } = await api.all('element', {
      filter: {
        product: products,
      },
      fields: ['id', 'product'],
    });

    const { data: catalogs } = await api.all('catalog', {
      ...options,
      filter: {
        ...options?.filter,
        element: map(elements, 'id'),
      },
    });

    if (!catalogs.length) {
      return products.map(constant(null));
    }

    const catalogsSalesCount = await SalesCountApi.catalogs({ ids: map(catalogs, 'id') });

    return products.map((product) => {
      const productElements = filter(elements, ['product', product]);
      const productCatalogs = catalogs.filter(({ element }) => (
        productElements.some(({ id }) => defaultTo(element.id, element) === id)
      ));
      const productCatalogsSalesCount = productCatalogs.map((catalog) => catalogsSalesCount[catalogs.indexOf(catalog)]);

      const productCatalogsSalesCountPairs = zip(productCatalogs, productCatalogsSalesCount);
      const filteredSalesCountPairs = productCatalogsSalesCountPairs.filter(([, salesCount]) => salesCount > 0);

      if (filteredSalesCountPairs.length === 0) {
        return null;
      }

      const popularCatalog = maxBy(filteredSalesCountPairs, '1')[0];
      return defaultTo(popularCatalog, null);
    });
  }

  async productCatalog({ product, options }) {
    return (await this.productsCatalog({
      products: [product],
      options,
    }))[0];
  }

  // eslint-disable-next-line class-methods-use-this
  async elementsCatalog({ elements, options }) {
    requiredFieldsInOptions(options, ['id', 'element']);

    const { data: catalogs } = await api.all('catalog', {
      filter: {
        element: map(elements, 'id'),
      },
    });

    if (!catalogs.length) {
      return elements.map(constant(null));
    }

    const catalogsSalesCount = await SalesCountApi.catalogs({
      ids: map(catalogs, 'id'),
    });

    return elements.map((element) => {
      const elementCatalogs = catalogs.filter(({ element: catalogElement }) => (
        defaultTo(catalogElement.id, catalogElement) === element
      ));
      const elementCatalogsSalesCount = elementCatalogs.map((catalog) => catalogsSalesCount[catalogs.indexOf(catalog)]);

      const elementCatalogsSalesCountPairs = zip(elementCatalogs, elementCatalogsSalesCount);
      const filteredSalesCountPairs = elementCatalogsSalesCountPairs.filter(([, salesCount]) => salesCount > 0);

      if (filteredSalesCountPairs.length === 0) {
        return null;
      }

      const popularCatalog = maxBy(filteredSalesCountPairs, '1')[0];
      return defaultTo(popularCatalog, null);
    });
  }

  async elementCatalog({ element, options }) {
    return (await this.elementsCatalog({
      elements: [element],
      options,
    }))[0];
  }
}

export default new PopularApi();
