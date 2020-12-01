export function setQuery(state, query) {
  if (!state.queries.includes(query)) {
    state.queries.push(query);
  }
}
