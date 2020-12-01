export function isOpen(state) {
  return state.isOpen;
}

export function brands(state) {
  return state.brands;
}

export function price(state) {
  return state.price;
}

export function options(state) {
  return state.options;
}

export function category(state) {
  return state.category;
}

// start Axrorbek Nisonboyev

export function hasItem(state, getters) {
  return (id) => getters.category.includes(id);
}
// end Axrorbek Nisonboyev
