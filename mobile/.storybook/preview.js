import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';

import 'quasar/dist/quasar.sass';

import '@/css/app.scss';

import '@/boot/fragment';
import '@/boot/gmap';
import '@/boot/vue-constants';
import { i18n } from '@/boot/i18n';
import '@/boot/vue-formulate';
import '@/boot/dev-dialog';

import '@/extendVueTypes';

import Vue from 'vue';
import Quasar from 'quasar';

Vue.use(Quasar);

import StoryRouter from 'storybook-vue-router';

export const parameters = {
  viewport: {
    defaultViewport: 'mobile',

    viewports: {
      mobile: {
        type: 'mobile',
        name: 'Mobile',
        styles: {
          width: '360px',
          height: '640px',
        },
      },

      tablet: {
        type: 'tablet',
        name: 'Tablet',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },

      laptop: {
        type: 'desktop',
        name: 'Laptop',
        styles: {
          width: '1280px',
          height: '720px',
        },
      },

      desktop: {
        type: 'desktop',
        name: 'Desktop',
        styles: {
          width: '1920px',
          height: '1080px',
        },
      },
    },
  },
};

export const decorators = [
  () => ({
    i18n,
    template: '<story />',
    beforeCreate() {
      this.$root._i18n = this.$i18n;
    },
  }),
  StoryRouter(),
];
