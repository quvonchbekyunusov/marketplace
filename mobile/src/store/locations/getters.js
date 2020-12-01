import { cloneDeep } from 'lodash-es';

export function getLocations(state) {
  return cloneDeep(state.locations).reverse();
}

export function items(state) {
  return state.items;
}

export function itemsCount(state) {
  return state.items.length;
}
