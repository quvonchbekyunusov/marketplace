import { cloneDeep, defaults, find, pick } from 'lodash-es';

class Api {
  #gateway = null;

  #resources = [];

  set gateway(gateway) {
    gateway.api = this;
    this.#gateway = gateway;
  }

  registerResource(resource) {
    this.#resources.push(resource);
  }

  getResource(name) {
    return find(this.#resources, ['name', name]);
  }

  // eslint-disable-next-line max-len
  async all(resourceName, options) {
    this.validateResourceName(resourceName);

    const normalizedOptions = this.normalizeOptions(resourceName, options, ['filter', 'include', 'sort', 'page', 'fields', 'computed']);

    return this.#gateway.all(resourceName, normalizedOptions);
  }

  async one(resourceName, id, options) {
    this.validateResourceName(resourceName);

    const normalizedOptions = this.normalizeOptions(resourceName, options, ['include', 'fields', 'computed']);

    return this.#gateway.one(resourceName, id, normalizedOptions);
  }

  async multiple(resourceName, ids, options) {
    this.validateResourceName(resourceName);

    const normalizedOptions = this.normalizeOptions(resourceName, options, ['include', 'fields', 'computed']);

    return this.#gateway.multiple(resourceName, ids, normalizedOptions);
  }

  async create(resourceName, body) {
    this.validateResourceName(resourceName);

    return this.#gateway.create(resourceName, body);
  }

  async update(resourceName, id, body) {
    this.validateResourceName(resourceName);

    return this.#gateway.update(resourceName, id, body);
  }

  async put(resourceName, id, body) {
    this.validateResourceName(resourceName);

    return this.#gateway.put(resourceName, id, body);
  }

  async delete(resourceName, id) {
    this.validateResourceName(resourceName);

    return this.#gateway.delete(resourceName, id);
  }

  async register(...args) {
    return this.#gateway.register(...args);
  }

  async login(...args) {
    console.log(...args);
    return this.#gateway.login(...args);
  }

  async logout(...args) {
    return this.#gateway.logout(...args);
  }

  validateResourceName(resourceName) {
    if (!this.getResource(resourceName)) {
      throw new Error(`Trying to request an unknown resource - '${resourceName}'`);
    }
  }

  normalizeOptions(resourceName, options = {}, allowedOptions) {
    const normalizedOptions = defaults(cloneDeep(options), {
      filter: {},
      include: [],
      sort: [],
      page: null,
      fields: this.getResource(resourceName).fields,
      computed: {},
    });

    return pick(normalizedOptions, allowedOptions);
  }
}

export default Api;
