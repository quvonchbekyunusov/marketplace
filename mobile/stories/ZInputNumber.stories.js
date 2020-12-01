import ZInputNumber from '@/components/ZInputNumber';
import { action } from '@storybook/addon-actions';
import { componentStories } from './utils/vue-stories';

const { definition, story } = componentStories(ZInputNumber, {
  value: 99,
}, {
  input: action('changeQuantity'),
});

export default definition;

definition.parameters = {
  layout: 'centered',
};

export const Basic = story();
