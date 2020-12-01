import { action } from '@storybook/addon-actions';

export default {
  title: 'Formulate/Range/Range',
  parameters: {},
};
export const Basic = () => ({
  template: `
    <div>
      <formulate-input
        v-model="value"
        type="range"
        :min="0"
        :max="100"
        snap
        :step="1"
      />
      {{ value }}
    </div>
  `,
  data() {
    return {
      value: 25,
    };
  },
  watch: {
    value: action('v-model'),
  },
});
