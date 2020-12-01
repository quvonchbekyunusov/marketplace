import { action } from '@storybook/addon-actions';

export default {
  title: 'Formulate/Text/Color',
  parameters: {
    layout: 'centered',
  },
};

export const Basic = () => ({
  template: `
    <formulate-input
      v-model="value"
      type="color"
      help="Help"
      outlined
    />
  `,
  data() {
    return {
      value: '',
    };
  },
  watch: {
    value: action('v-model'),
  },
});
