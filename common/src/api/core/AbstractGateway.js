class AbstractGateway {
  #api = null;

  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  async all(resourceName, options) {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  async one(resourceName, id, options) {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  async multiple(resourceName, ids, options) {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  async create(resourceName, data) {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  async delete(resourceName, id) {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  async update(resourceName, id, data) {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  async put(resourceName, id, data) {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line class-methods-use-this
  async register() {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line class-methods-use-this
  async login() {
    throw new Error('Method is not implemented');
  }

  // eslint-disable-next-line class-methods-use-this
  async logout() {
    throw new Error('Method is not implemented');
  }

  set api(api) {
    this.#api = api;
  }

  get api() {
    return this.#api;
  }
}

export default AbstractGateway;
