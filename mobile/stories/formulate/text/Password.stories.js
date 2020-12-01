import { action } from '@storybook/addon-actions';

export default {
  title: 'Formulate/Text/Password',
  parameters: {
    layout: 'centered',
  },
};

export const Basic = () => ({
  template: `
    <formulate-input
      v-model="value"
      type="password"
      label="Password"
      help="Help"
      outlined
      validation="required|min:8"
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
