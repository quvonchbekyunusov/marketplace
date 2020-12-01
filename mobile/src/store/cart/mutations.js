import { find } from 'lodash-es';

export function addItem(state, { offerId, quantity = 1 }) {
  const item = find(state.items, ['offerId', offerId]);

  if (item) {
    item.quantity += quantity;
  } else {
    state.items.push({ offerId, quantity });
  }
}

export function removeItem(state, { offerId }) {
  state.items.splice(state.items.findIndex((item) => item.offerId === offerId), 1);
}

export function subtractItem(state, { offerId, quantity = 1 }) {
  const item = find(state.items, ['offerId', offerId]);

  if (item) {
    item.quantity -= quantity;

    if (item.quantity <= 0) {
      removeItem(state, offerId);
    }
  }
}

export function replaceItem(state, { offerId, quantity }) {
  const item = find(state.items, ['offerId', offerId]);

  if (item) {
    item.quantity = quantity;
  } else {
    addItem(state, { offerId, quantity });
  }
}

export function clear(state) {
  state.items = [];
}

export function replaceItems(state, newItems) {
  state.items = newItems;
}
