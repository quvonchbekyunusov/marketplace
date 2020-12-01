import { action } from '@storybook/addon-actions';

export default {
  title: 'Formulate/Select/Select',
  parameters: {},
};
const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle',
];
export const Basic = () => ({
  template: `
    <div>
      <formulate-input
        v-model="value"
        type="select"
        label="Select"
        :options="options"
        help="Help"
        validation="required"
      />
      {{ value }}
    </div>
  `,
  data() {
    return {
      value: '',
      options: stringOptions,
    };
  },
  watch: {
    value: action('v-model'),
  },
});
