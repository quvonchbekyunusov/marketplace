import { uniq, without } from 'lodash-es';
import AbstractStorage from './AbstractStorage';

class LocalStorage extends AbstractStorage {
  #id = null;

  constructor(id) {
    super();
    this.#id = id;
    this.#initKeys();
  }

  set(key, value) {
    validateKey(key);

    this.#registerKey(key);

    const transformedKey = this.#transformKey(key);
    localStorage.setItem(transformedKey, JSON.stringify(value));
  }

  get(key) {
    validateKey(key);

    if (!this.has(key)) {
      return null;
    }

    const transformedKey = this.#transformKey(key);
    return JSON.parse(localStorage.getItem(transformedKey));
  }

  delete(key) {
    validateKey(key);

    this.#unregisterKey(key);

    const transformedKey = this.#transformKey(key);
    localStorage.removeItem(transformedKey);
  }

  has(key) {
    validateKey(key);

    return this.#isKeyRegistered(key);
  }

  // eslint-disable-next-line class-methods-use-this
  clear() {
    const keys = this.#keys();
    keys.forEach(this.delete.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  get length() {
    return this.#keys().length;
  }

  #transformKey = (key) => `${this.#id}/${key}`;

  #isKeyRegistered = (key) => this.#keys().includes(key);

  #registerKey = (key) => this.#setKeys(uniq([...this.#keys(), key]));

  #unregisterKey = (key) => this.#setKeys(without(this.#keys(), key));

  #setKeys = (keys) => localStorage.setItem(this.#id, JSON.stringify(keys));

  #keys = () => JSON.parse(localStorage.getItem(this.#id));

  #initKeys = () => this.#setKeys(this.#keys() || []);
}

function validateKey(key) {
  if (typeof key !== 'string') {
    throw new Error(`Storage entry key must be a string, got ${typeof key} with value ${key}`);
  }
}

export default LocalStorage;
