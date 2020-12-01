import { pull } from 'lodash-es';
import LocalStorage from '../storage/LocalStorage';

class Cache {
  #timeout = null;

  #storage = new LocalStorage('__cache__');

  #staleEntries = new Set();

  #invalidationTimers = new Map();

  constructor({ timeout = 0 } = {}) {
    validateTimeout(timeout);
    this.#timeout = timeout;
  }

  set(key, value, { timeout = null } = {}) {
    pull(this.#staleEntries, key);
    this.#storage.set(key, value);

    timeout = timeout || this.#timeout;

    if (timeout !== 0) {
      this.#invalidateAfter(key, timeout);
    }
  }

  get(key) {
    if (!this.has(key)) {
      throw new Error(`Trying to get unknown cache entry '${key}'`);
    }

    const that = this;

    return {
      value: this.#storage.get(key),

      get isValid() {
        return that.isValid(key);
      },

      get isStale() {
        return that.isStale(key);
      },
    };
  }

  delete(key) {
    if (!this.has(key)) {
      throw new Error(`Trying to delete unknown cache entry '${key}'`);
    }

    pull(this.#staleEntries, key);
    this.#storage.delete(key);
  }

  has(key) {
    return this.#storage.has(key);
  }

  isValid(key) {
    if (!this.has(key)) {
      throw new Error(`Cache entry '${key}' does not exist`);
    }

    return !this.isStale(key);
  }

  isStale(key) {
    if (!this.has(key)) {
      throw new Error(`Cache entry '${key}' does not exist`);
    }

    return this.#staleEntries.has(key);
  }

  invalidate(key) {
    if (!this.has(key)) {
      throw new Error(`Trying to invalidate unknown cache entry - ${key}`);
    }

    this.#staleEntries.add(key);
  }

  get length() {
    return this.#storage.size;
  }

  clear() {
    this.#storage.clear();
    this.#staleEntries.clear();
    this.#invalidationTimers.forEach((_, key) => this.#cancelInvalidation(key));
  }

  #invalidateAfter = (key, timeout) => {
    validateTimeout(timeout);

    if (this.#invalidationTimers.has(key)) {
      this.#cancelInvalidation(key);
    }

    const timer = setTimeout(() => {
      this.invalidate(key);
      this.#cancelInvalidation(key);
    }, timeout);

    this.#invalidationTimers.set(key, timer);

    return () => this.#cancelInvalidation(key);
  };

  #cancelInvalidation = (key) => {
    if (!this.#invalidationTimers.has(key)) {
      throw new Error(`Cache entry '${key}' is either already invalidated or is not registered for invalidation`);
    }

    clearTimeout(this.#invalidationTimers.get(key));
  };
}

function validateTimeout(timeout) {
  if (timeout < 0) {
    throw new Error(`Timeout value cannot be negative, got '${timeout}'`);
  }

  if (Math.floor(timeout) !== timeout) {
    throw new Error(`Timeout value must be an integer, got '${timeout}'`);
  }
}

export default Cache;
