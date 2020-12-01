import { map, minBy, maxBy } from 'lodash-es';
import api from '../api';

class PriceApi {
  // eslint-disable-next-line class-methods-use-this
  async cheapestCatalog({ product }) {
    const { data: elements } = await api.all('element', {
      filter: {
        product,
      },
      fields: ['id'],
    });

    if (elements.length === 0) {
      return null;
    }

    const { data: catalogs } = await api.all('catalog', {
      filter: {
        element: map(elements, 'id'),
      },
    });

    if (catalogs.length === 0) {
      return null;
    }

    return minBy(catalogs, 'price');
  }

  /* start|AzimjonToirov|10/29/2020 */

  // eslint-disable-next-line class-methods-use-this
  async priciestCatalog({ product }) {
    const { data: elements } = await api.all('element', {
      filter: {
        product,
      },
      fields: ['id'],
    });

    if (elements.length === 0) {
      return null;
    }

    const { data: catalogs } = await api.all('catalog', {
      filter: {
        element: map(elements, 'id'),
      },
    });

    if (catalogs.length === 0) {
      return null;
    }

    return maxBy(catalogs, 'price');
    /* end|AzimjonToirov|10/29/2020 11-lines js */
  }
}

export default new PriceApi();
