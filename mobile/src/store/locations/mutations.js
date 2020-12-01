import { find } from 'lodash-es';

export function addLocation(state, location) {
  const isDuplicated = find(state.items, ['addressName', location.addressName]);
  if (!isDuplicated) {
    state.items.push(location);
  }
}

export function removeLocation(state, location) {
  state.items.splice(
    state.items.findIndex((item) => item.addressName === location.addressName), 1,
  );
}
