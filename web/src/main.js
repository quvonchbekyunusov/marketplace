import Vue from 'vue';
import StarRating from 'vue-star-rating';
import Fragment from 'vue-fragment';
import { Checkbox, Radio } from 'vue-checkbox-radio';
import { kebabCase } from 'lodash-es';
import FlagIcon from 'vue-flag-icon';
import App from './App.vue';
import router from './router';
import store from './store';
import '@common/extendVueTypes';
import 'vue-awesome/icons';
import 'vue-material-design-icons/styles.css';
import './css/tailwind.css';

Vue.use(FlagIcon);
Vue.use(Fragment.Plugin);

registerUiComponents();

Vue.component('z-star-rating', StarRating);
Vue.component('z-checkbox-ui', Checkbox);
Vue.component('z-radio-ui', Radio);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

function registerUiComponents() {
  const uiContext = require.context('./components/ui', true, /\.vue$/);
  uiContext.keys().forEach((ui) => {
    const name = kebabCase(ui.slice(ui.lastIndexOf('/') + 1, -4));
    Vue.component(name, uiContext(ui).default);
  });
}
