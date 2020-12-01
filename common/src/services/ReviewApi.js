import { sumBy, defaultTo } from 'lodash-es';
import api from '../api';

const requiredFieldsInOptions = (options, fields) => {
  if (!options || !options.fields) {
    return;
  }

  const neededFields = fields.filter((field) => !options.fields.includes(field));
  options.fields.push(...neededFields);
};

class ReviewApi {
  // eslint-disable-next-line class-methods-use-this
  async products({ ids, options }) {
    requiredFieldsInOptions(options, ['product']);

    const { data: reviews } = await api.all('review', {
      ...options,
      filter: {
        ...options?.filter,
        product: ids,
      },
    });

    return ids.map((id) => {
      const productReviews = reviews.filter(({ product }) => defaultTo(product?.id, product) === id);
      const totalRating = sumBy(productReviews, 'rating');
      const reviewsCount = productReviews.length;
      const averageRating = reviewsCount === 0 ? 0 : totalRating / reviewsCount;

      return {
        reviews: productReviews,
        totalRating,
        averageRating,
        reviewsCount,
      };
    });
  }

  async product({ id, options }) {
    return (await this.products({ ids: [id], options }))[0];
  }
}

export default new ReviewApi();
