export function toggle(state) {
  state.isOpen = !state.isOpen;
}

export function open(state) {
  state.isOpen = true;
}

export function close(state) {
  state.isOpen = false;
}
