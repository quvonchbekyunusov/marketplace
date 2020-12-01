import { find } from 'lodash-es';

export function add(state, creditCardData) {
  const exist = find(state.items, ['name', creditCardData.name]);
  if (!exist) {
    state.items.push(creditCardData);
  }
}

export function remove(state, creditCardData) {
  state.items.splice(
    state.items.indexOf((item) => item.cardNumber === creditCardData.cardNumber),
    1,
  );
}

export function change(state, isFromCheckout) {
  state.isFromCheckout = isFromCheckout;
}
