import { action } from '@storybook/addon-actions';
import ZProductCartDumb from '@/components/ZProductCartDumb';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZProductCartDumb, {
  style: { width: '185px' },
  price: {
    min: 150000,
    value: 500000,
  },
  product: {
    id: '212',
    name: 'Sony camera',
    images: ['/images/camera.jpg'],
    description: 'Short description',
    rating: 4.7,
  },
  reviewsCount: 10,
  offersCount: 134,
}, {
  'update:is-in-cart': action('update:is-in-cart'),
  'update:is-wished': action('update:is-wished'),
});

definition.parameters = {
  layout: 'centered',
};

export default definition;

export const Basic = story();

export const WhenInCart = story({ isInCart: true });

export const WhenInWishlist = story({ isWished: true });

export const WhenDiscounted = story({
  price: {
    min: 1000000,
    value: 2000000,
    old: 5000000,
  },
});

export const WhenLongestDescriptions = story({
  product: {
    description: 'Sony Camera Exmor RS CMOS sensor with 14,2Mp effective.'
      + 'Sony Camera Exmor RS CMOS sensor with 14,2Mp effective.'
      + 'Sony Camera Exmor RS CMOS sensor with 14,2Mp effective.',
  },
});
