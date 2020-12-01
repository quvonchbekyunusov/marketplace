import { action } from '@storybook/addon-actions';

export default {
  title: 'Formulate/Text/search',
  parameters: {
    layout: 'centered',
  },
};

export const Basic = () => ({
  template: `
    <formulate-input
      v-model="value"
      type="search"
      label="Search"
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
