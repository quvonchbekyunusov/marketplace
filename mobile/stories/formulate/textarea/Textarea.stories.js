import { action } from '@storybook/addon-actions';

export default {
  title: 'Formulate/Textarea/Textarea',
  parameters: {
    layout: 'centered',
  },
};

export const Basic = () => ({
  template: `
    <formulate-input
      v-model="value"
      type="textarea"
      label="Textarea"
      help="Help"
      outlined
      validation="required"
      rows="5"
      cols="50"
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
