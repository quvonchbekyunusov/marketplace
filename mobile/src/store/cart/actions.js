import { Notify } from 'quasar/dist/quasar.esm';

export function addItem({ commit, getters }, { offerId, quantity }) {
  const hadItem = getters.hasItem(offerId);

  commit('addItem', { offerId, quantity });

  const isItemAdded = getters.hasItem(offerId) && !hadItem;
  if (isItemAdded) {
    Notify.create({ type: 'cart:added' });
  }
}

export function subtractItem({ commit, getters }, { offerId, quantity }) {
  const hadItem = getters.hasItem(offerId);

  commit('subtractItem', { offerId, quantity });

  const isItemRemoved = !getters.hasItem(offerId) && hadItem;
  if (isItemRemoved) {
    Notify.create({ type: 'cart:deleted' });
  }
}

export function replaceItem({ commit, getters }, { offerId, quantity }) {
  const hadItem = getters.hasItem(offerId);

  commit('replaceItem', { offerId, quantity });

  const hasItem = getters.hasItem(offerId);
  if (hadItem && !hasItem) {
    Notify.create({ type: 'cart:deleted' });
  } else if (!hadItem && hasItem) {
    Notify.create({ type: 'cart:added' });
  }
}

export function removeItem({ commit, getters }, { offerId }) {
  const hadItem = getters.hasItem(offerId);

  commit('removeItem', { offerId });

  const isItemRemoved = !getters.hasItem(offerId) && hadItem;
  if (isItemRemoved) {
    Notify.create({ type: 'cart:deleted' });
  }
}

export function clear({ commit }) {
  commit('clear');
}

export function replaceItems({ commit }, payload) {
  commit('replaceItems', payload);
}
