export function addItem(state, itemId) {
  if (!state.items.includes(itemId)) {
    state.items.push(itemId);
  }
}

export function removeItem(state, itemId) {
  state.items.splice(state.items.indexOf(itemId), 1);
}

export function toggleItem(state, itemId) {
  if (state.items.includes(itemId)) {
    removeItem(state, itemId);
  } else {
    addItem(state, itemId);
  }
}

export function clear(state) {
  state.items = [];
}

export function replaceItems(state, items) {
  state.items = items;
}
