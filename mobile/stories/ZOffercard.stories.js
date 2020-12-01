import ZOfferCard1 from '@/components/ZOfferCard1';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZOfferCard1, {
  offer: {
    price: 1050000,
    sellerName: 'MediaPark',
    productName: 'HP Laptop 307',
    rating: '4.7',
    reviewsCount: '51',
  },
});

definition.parameters = {
  layout: 'centered',
};

export default definition;

export const Basic = story();
