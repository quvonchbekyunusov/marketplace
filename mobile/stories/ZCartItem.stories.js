import { action } from '@storybook/addon-actions';
import ZCartItemDumb from '@/components/ZCartItemDumb';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZCartItemDumb, {
  productName: 'Metal Earrings',
  productCartImage: '/images/camera.jpg',
  sellerName: 'Makro Supermarket',
  offerPrice: 480000,
  isSoldOut: false,
  quantity: 113,
  selected: false,
}, {
  remove: action('remove'),
  'update:quantity': action('update:quantity'),
});

export default definition;

/* definition.parameters = {
  layout: 'centered',
}; */

export const Basic = story();

export const WhenSoldOut = story({
  isSoldOut: false,
});
