import { action } from '@storybook/addon-actions';
import ZSearchCard from '@/components/ZSearchCard';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZSearchCard, {
  product: {
    name: 'Sumsung PC 1TB Gray',
    images: ['images/camera.jpg'],
  },
  price: {
    value: 120000,
    old: 100000,
  },
  rating: 5,
  reviewsCount: 31,
}, {
  'update:is-wished': action('update:is-wished'),
  'update:is-in-cart': action('update:is-in-cart'),
});

export default definition;

/* definition.parameters = {
  layout: 'centered',
}; */

export const Basic = story();

export const WhenInWishlist = story({ isWished: true });
export const WhenSoldOut = story({
  isSoldOut: false,
});

export const WhenInCart = story({ isIncart: true });
