import { cloneDeep } from 'lodash-es';
import AbstractStorage from './AbstractStorage';

class MemoryStorage extends AbstractStorage {
  #storage = new Map();

  set(key, value) {
    validateKey(key);
    this.#storage.set(key, cloneDeep(value));
  }

  get(key) {
    validateKey(key);
    return this.#storage.get(key);
  }

  delete(key) {
    validateKey(key);
    this.#storage.delete(key);
  }

  has(key) {
    validateKey(key);
    return this.#storage.has(key);
  }

  clear() {
    this.#storage.clear();
  }

  get length() {
    return this.#storage.size;
  }
}

function validateKey(key) {
  if (typeof key !== 'string') {
    throw new Error(`Storage entry key must be a string, got ${typeof key} with value ${key}`);
  }
}

export default MemoryStorage;
