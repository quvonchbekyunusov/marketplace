import { action } from '@storybook/addon-actions';

export default {
  title: 'Formulate/Button/Button',
  parameters: {
    layout: 'centered',
  },
};

export const Basic = () => ({
  template: `
    <formulate-input
      value="Button"
      type="button"
      color="primary"
      @click="onClick"
    />
  `,
  methods: {
    onClick: action('click'),
  },
});
