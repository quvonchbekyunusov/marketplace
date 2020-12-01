export function setCreditCard({ commit }, payload) {
  commit('add', payload);
}

export function removeCreditCard({ commit }, payload) {
  commit('remove', payload);
}

export function changeCreditCard({ commit }, payload) {
  commit('change', payload);
}
