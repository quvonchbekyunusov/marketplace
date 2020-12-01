import { action } from '@storybook/addon-actions';

export default {
  title: 'Formulate/Text/Time',
  parameters: {
    layout: 'centered',
  },
};

export const Basic = () => ({
  template: `
    <formulate-input
      v-model="value"
      type="time"
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
