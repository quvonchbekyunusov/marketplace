import { Notify } from 'quasar';

Notify.registerType('cart:added', {
  message: 'Товар добавлен в корзину',
  position: 'bottom',
  color: 'primary',
  icon: 'o_done',
  timeout: 750,
  group: 1,
  badgeClass: 'hidden',
});

Notify.registerType('cart:deleted', {
  message: 'Товар удален из корзины',
  position: 'bottom',
  color: 'negative',
  icon: 'o_delete',
  timeout: 750,
  group: 1,
  badgeClass: 'hidden',
});
