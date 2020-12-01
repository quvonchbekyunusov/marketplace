import { action } from '@storybook/addon-actions';

export default {
  title: 'Formulate/Text/Tel',
  parameters: {
    layout: 'centered',
  },
};

export const Basic = () => ({
  template: `
    <formulate-input
      v-model="value"
      type="tel"
      label="Tel"
      help="Help"
      outlined
      validation="required"
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
