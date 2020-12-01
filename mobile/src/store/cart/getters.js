import { matchesProperty } from 'lodash-es';

export function items(state) {
  return state.items;
}

export function itemsCount(state, getters) {
  return getters.items.length;
}

export function getItemQuantity(state, getters) {
  return (offerId) => {
    const foundItem = getters.items.find((item) => item.offerId === offerId);
    return foundItem ? foundItem.quantity : 0;
  };
}

export function hasItem(state, getters) {
  return (id) => getters.items.some(matchesProperty('offerId', id));
}
