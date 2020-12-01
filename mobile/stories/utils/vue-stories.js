import { cloneDeep, merge } from 'lodash-es';

export function componentStories(component, defaultProps = {}, defaultListeners = {}) {
  const Template = (props = {}, listeners = {}) => {
    const allProps = merge(cloneDeep(defaultProps), props);
    const allListeners = merge(cloneDeep(defaultListeners), listeners);

    const { style, class: className } = allProps;
    delete allProps.style;
    delete allProps.class;

    return ({
      props: Object.keys(allProps),
      components: { [component.name]: component },
      constants: {
        component,
      },
      template: '<component :is="component" :style="style" :class="className" v-bind="props" v-on="listeners" />',
      beforeCreate() {
        this.style = style;
        this.className = className;
        this.props = allProps;
        this.listeners = allListeners;
      },
    });
  };

  return {
    definition: {
      title: component.name,
      component,
    },

    story(props = {}, listeners = {}) {
      return Template.bind({}, props, listeners);
    },
  };
}
