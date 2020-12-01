import ZOffersCount from '@/components/ZOffersCount';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZOffersCount);

definition.parameters = {
  layout: 'centered',
};

export default definition;

export const Basic = story({
  offersCount: 312,
  price: 200000,
});

export const WithManyOffersCount = story({
  offersCount: 21221321,
  price: 200000,
});
