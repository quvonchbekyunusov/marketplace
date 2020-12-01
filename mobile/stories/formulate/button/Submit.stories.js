import { action } from '@storybook/addon-actions';

export default {
  title: 'Formulate/Button/Submit',
  parameters: {
    layout: 'centered',
  },
};

export const Basic = () => ({
  template: `
    <formulate-input
      value="Submit"
      type="submit"
      color="primary"
      @click="onClick"
    />
  `,
  methods: {
    onClick: action('click'),
  },
});
