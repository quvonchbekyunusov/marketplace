import ZCompareProductCard from '@/components/ZCompareProductCard';
import { action } from '@storybook/addon-actions';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZCompareProductCard, {
  style: { width: '185px' },
  price: {
    old: 150000,
    value: 850000,
  },
  product: {
    name: 'Sony camera',
    images: ['/images/camera.jpg'],
    description: 'Short description',
  },
}, {
  'update:is-in-cart': action('update:is-in-cart'),
  'update:is-wished': action('update:is-wished'),
  delete: action('deleted'),
});

export default definition;

definition.parameters = {
  layout: 'centered',
};

export const Basic = story();

export const WhenIsInCart = story({
  isInCart: true,
});
