import ZInput from '@/components/ZInput.vue';

export default {
  title: 'UI/ZInput',
  component: ZInput,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ZInput },
  template: '<z-input @input="onInput" v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
  value: 'value',
};
