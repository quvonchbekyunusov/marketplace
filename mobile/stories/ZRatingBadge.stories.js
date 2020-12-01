import ZRating from '@/components/ZRating';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZRating, {});
definition.parameters = {
  layout: 'centered',
};

export default definition;

export const Basic = story();

export const WithManyReviews = story({ rating: 3, reviewsCount: 5876 });

export const WithTypeStar = story({
  type: 'star',
  rating: 2,
  reviewsCount: 5876,
});

export const WithSize = story({
  type: 'star',
  size: 'md',
  rating: 2,
  reviewsCount: 5,
});
