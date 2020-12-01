import { action } from '@storybook/addon-actions';

export default {
  title: 'Formulate/Text/Email',
  parameters: {
    layout: 'centered',
  },
};

export const Basic = () => ({
  template: `
    <formulate-input
      v-model="value"
      type="email"
      label="Email"
      help="Help"
      outlined
      validation="required|email"
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
