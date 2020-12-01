export function items(state) {
  return state.items;
}

export function itemsCount(state, getters) {
  return getters.items.length;
}

export function hasItem(state, getters) {
  return (id) => getters.items.includes(id);
}
