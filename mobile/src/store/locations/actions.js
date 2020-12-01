export function setLocation({ commit }, payload) {
  commit('addLocation', payload);
}

export function remove({ commit }, payload) {
  commit('removeLocation', payload);
}
