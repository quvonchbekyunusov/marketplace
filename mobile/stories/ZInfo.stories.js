import ZInfo from '@/components/ZInfo';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZInfo, {
  model: '',
  offerPrice: 800000,
  rating: 2,
  reviewsCount: 5876,
  offer: {
    rating: 20,
    reviewsCount: 5876,
  },
});

export default definition;

definition.parameters = {
  layout: 'centered',
};

export const Basic = story();
