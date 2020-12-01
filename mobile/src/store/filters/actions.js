export function setBrands({ commit }, payload) {
  commit('setBrands', payload);
}

export function clearBrands({ commit }) {
  commit('clearBrands');
}

export function setPrice({ commit }, payload) {
  commit('setPrice', payload);
}

export function clearPrice({ commit }) {
  commit('clearPrice');
}

export function setOptions({ commit }, payload) {
  commit('setOptions', payload);
}

export function clearOptions({ commit }) {
  commit('clearOptions');
}

export function setIsOpen({ commit }, payload) {
  commit('setIsOpen', payload);
}

export function open({ commit }) {
  commit('open');
}

export function close({ commit }) {
  commit('close');
}

export function setCategory({ commit }, payload) {
  commit('setCategory', payload);
}

// start Axrorbek Nisonboyev
export function removeCategory({ commit }, payload) {
  commit('removeCategory', payload);
}

export function clearCategory({ commit }) {
  commit('clearCategory');
}

// end Axrorbek Nisonboyev
