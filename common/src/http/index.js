// eslint-disable-next-line no-unused-vars
import axios, { AxiosInstance } from 'axios';

import Cache from '../cache';

class Http {
  /** @type AxiosInstance */
  #axios = null;

  /** @type Cache */
  #cache = null;

  constructor({ cache, ...axiosConfig } = {}) {
    if (cache) {
      this.#cache = new Cache(cache);
    }

    this.#axios = axios.create(axiosConfig);
  }

  async get(url, config = {}) {
    return this.request({
      url,
      method: 'GET',
      ...config,
    });
  }

  async post(url, data, config = {}) {
    return this.request({
      url,
      method: 'POST',
      data,
      ...config,
    });
  }

  async put(url, data, config = {}) {
    return this.request({
      url,
      method: 'PUT',
      data,
      ...config,
    });
  }

  async patch(url, data, config = {}) {
    return this.request({
      url,
      method: 'PATCH',
      data,
      ...config,
    });
  }

  async delete(url, config = {}) {
    return this.request({
      url,
      method: 'DELETE',
      ...config,
    });
  }

  async request(config) {
    if (this.#cache && config.method === 'GET') {
      const cacheKey = this.#getCacheKey(config);

      if (this.#cache.has(cacheKey) && this.#cache.isValid(cacheKey)) {
        const { value, ...cache } = this.#cache.get(cacheKey);
        return { ...value, cache };
      }

      const response = await this.#axios.request(config);
      // response.isFromCache = false;

      this.#cache.set(cacheKey, response);

      return response;
    }

    if (this.#cache) {
      this.#cache.clear();
    }

    const response = await this.#axios.request(config);

    if (this.#cache) {
      response.isFromCache = false;
    }

    return response;
  }

  get interceptors() {
    return this.#axios.interceptors;
  }

  #getCacheKey = ({ baseURL, url, headers, params }) => JSON.stringify({
    baseURL,
    url,
    headers,
    params,
  });
}

export default Http;
