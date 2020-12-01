export function addItem({ commit }, payload) {
  commit('addItem', payload);
}

export function removeItem({ commit }, payload) {
  commit('removeItem', payload);
}

export function toggleItem({ commit }, payload) {
  commit('toggleItem', payload);
}

export function clear({ commit }, payload) {
  commit('clear', payload);
}

export function replaceItems({ commit }, payload) {
  commit('replaceItems', payload);
}
