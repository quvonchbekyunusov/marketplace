class AbstractStorage {
  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  set(key, value) {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  get(key) {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  delete(key) {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  has(key) {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line class-methods-use-this
  clear() {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line class-methods-use-this
  get length() {
    throw new Error('Getter is not implemented');
  }
}

export default AbstractStorage;
