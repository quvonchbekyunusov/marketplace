import Vue from 'vue';
import * as GmapVue from 'gmap-vue';

Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyBkxS5l87lclaC6MIWSGejdCXL13wSShRo',
    libraries: 'places',
    region: 'UZ',
    language: 'ru',
  },
  installComponents: true,
});
