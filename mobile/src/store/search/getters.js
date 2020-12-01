import { cloneDeep } from 'lodash-es';

export function getQueries(state) {
  return cloneDeep(state.queries).reverse();
}
