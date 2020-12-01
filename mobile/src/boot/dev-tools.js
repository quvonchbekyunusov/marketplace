import Vue from 'vue';
import JsonPrinter from '@/components/dev-only/JsonPrinter';

if (process.env.DEV) {
  Vue.component('json-printer', JsonPrinter);
}

if (process.env.PROD) {
  Vue.component('json-printer', {
    name: 'JsonPrinter',
    template: `
      <span></span>
    `,
  });
}
