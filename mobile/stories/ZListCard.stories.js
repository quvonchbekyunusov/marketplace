import { action } from '@storybook/addon-actions';
import ZListCard from '@/components/ZListCard';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZListCard, {
  product: {
    name: 'HD Laptop 307',
    images: ['images/camera.jpg'],
    description: 'hello world',
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
