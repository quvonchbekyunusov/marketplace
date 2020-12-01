import Vue from 'vue';
import { Dialog } from 'quasar';

Vue.prototype.$devDialog = {
  show() {
    Dialog.create({
      title: 'В разработке',
      message: 'Эта функция находится в разработке',
      ok: {
        color: 'primary',
        flat: true,
      },
    });
  },
  hide() {
    this.hide();
  },
};
