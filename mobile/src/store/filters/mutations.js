export function setBrands(state, brandIds) {
  state.brands = brandIds;
}

export function clearBrands(state) {
  state.brands = [];
}

export function setPrice(state, price) {
  state.price = price;
}

export function clearPrice(state) {
  state.price = null;
}

export function setOptions(state, options) {
  state.options = options;
}

export function clearOptions(state) {
  state.options = [];
}

export function setIsOpen(state, isOpen) {
  state.isOpen = isOpen;
}

export function open(state) {
  state.isOpen = true;
}

export function close(state) {
  state.isOpen = false;
}

export function setCategory(state, categoryId) {
  state.category.push(categoryId);
}

// start Axrorbek Nisonboyev

export function removeCategory(state, categoryId) {
  if (state.category.includes(categoryId)) {
    state.category.splice(state.category.indexOf(categoryId), 1);
  }
}

export function clearCategory(state) {
  state.category = [];
}

// end Axrorbek Nisonboyev
