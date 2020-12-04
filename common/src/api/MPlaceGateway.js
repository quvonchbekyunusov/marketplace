import { cloneDeep, compact, keyBy, map, mapValues, uniq, zip } from 'lodash-es';
import qs from 'qs';
import AbstractGateway from './core/AbstractGateway';
import * as RequestBuilder from './mplace-request-builder';
import ApiResponse from './core/ApiResponse';
import { Resources, Transformers } from './resources';
import Http from '../http';
import Auth from '../auth';

class MPlaceGateway extends AbstractGateway {
  static #API_HOST = 'http://market.zetsoft.uz';

  #http = new Http({
    baseURL: `${MPlaceGateway.#API_HOST}/rest`,
    paramsSerializer: (params) => {
      params.query = mapValues(params.query, (fieldQuery) => {
        if (Array.isArray(fieldQuery)) {
          fieldQuery = compact(fieldQuery);

          if (fieldQuery.length > 0) {
            return fieldQuery.join('|');
          }

          return undefined;
        }

        return fieldQuery;
      });

      return qs.stringify(params, { arrayFormat: 'comma' });
    },

    timeout: 0,

    cache: {
      timeout: 15 * 60 * 1_000, // 15 minutes
    },
  });

  #auth = new Auth('mplace-auth');

  constructor() {
    super();
    this.#http.interceptors.request.use((request) => {
      if (this.#auth.hasToken()) {
        request.headers.Authorization = `Bearer ${this.#auth.token}`;
      }

      return request;
    });
    this.#http.interceptors.response.use(({ data }) => data);
  }

  async multipleWithInclude({ resourceName, resourceData, options }) {
    const resource = Resources.get(resourceName);
    const include = options.include.filter((rel) => !rel.includes('.'));
    include.forEach((relationship) => {
      if (!resource.hasRelationship(relationship)) {
        throw new Error(`Trying to include unknown relationship of ${resourceName} - ${relationship}`);
      }
    });

    let relationshipsData = await Promise.all(
      include.map((relationship) => {
        const { resource: relationshipResource } = resource.getRelationship(relationship);

        let relationshipFields;
        const relationshipInclude = options.include
          .filter((inclusion) => inclusion.startsWith(`${relationship}.`))
          .map((inclusion) => inclusion.slice(relationship.length + 1));

        if (options.fields.includes(relationship) || !options.fields.some((field) => field.startsWith(`${relationship}.`))) {
          relationshipFields = Resources.get(relationshipResource).fields;
        } else {
          relationshipFields = options.fields
            .filter((field) => field.startsWith(`${relationship}.`))
            .map((field) => field.slice(relationship.length + 1));
        }

        return this.multiple(
          relationshipResource,
          uniq(resourceData.flatMap((item) => item[relationship])),
          {
            ...options,
            include: relationshipInclude,
            fields: relationshipFields,
          },
        );
      }),
    );
    relationshipsData = map(relationshipsData, 'data');
    relationshipsData = zip(include, relationshipsData);
    relationshipsData = relationshipsData.map(([relationship, data]) => [relationship, keyBy(data, 'id')]);
    relationshipsData = Object.fromEntries(relationshipsData);
    return resourceData.map((item) => {
      const itemRelData = Object.fromEntries(
        include.map((rel) => {
          const relData = Array.isArray(item[rel])
            ? item[rel].map((id) => relationshipsData[rel][id])
            : relationshipsData[rel][item[rel]];
          return [rel, cloneDeep(relData)];
        }),
      );
      return {
        ...item,
        ...itemRelData,
      };
    });
  }

  async singleWithInclude({ resourceName, resourceData, options }) {
    const resource = Resources.get(resourceName);

    const include = options.include.filter((rel) => !rel.includes('.'));

    include.forEach((relationship) => {
      if (!resource.hasRelationship(relationship)) {
        throw new Error(`Trying to include unknown relationship of ${resourceName} - ${relationship}`);
      }
    });

    const relationshipsData = await Promise.all(
      include.map((relationship) => {
        const { type: relationshipType, resource: relationshipResource } = resource.getRelationship(relationship);
        let relationshipFields;
        const relationshipInclude = options.include
          .filter((inclusion) => inclusion.startsWith(`${relationship}.`))
          .map((inclusion) => inclusion.slice(relationship.length + 1));

        if (options.fields.includes(relationship) || !options.fields.some((field) => field.startsWith(`${relationship}.`))) {
          relationshipFields = Resources.get(relationshipResource).fields;
        } else {
          relationshipFields = options.fields
            .filter((field) => field.startsWith(`${relationship}.`))
            .map((field) => field.slice(relationship.length + 1));
        }

        if (relationshipType === 'to-many') {
          return this.multiple(
            relationshipResource,
            resourceData[relationship],
            {
              ...options,
              include: relationshipInclude,
              fields: relationshipFields,
            },
          );
        }

        return this.one(
          relationshipResource,
          resourceData[relationship],
          {
            ...options,
            include: relationshipInclude,
            fields: relationshipFields,
          },
        );
      }),
    );

    return { ...resourceData, ...Object.fromEntries(zip(include, relationshipsData.map(({ data }) => data))) };
  }

  async all(resourceName, options) {
    const {
      meta: responseMeta,
      data: responseData,
    } = await this.#http.request(RequestBuilder.buildAll(resourceName, options));

    const data = Object.values(responseData);

    const meta = {};
    if (options.page) {
      meta.page = {
        number: responseMeta.currentPage + 1,
        size: responseMeta.perPage,
        total: responseMeta.pageCount,
      };

      meta.total = responseMeta.totalCount;
    }

    const resultData = await this.multipleWithInclude({
      resourceName,
      resourceData: data.map((item) => Transformers.get(resourceName).fromRaw(item, options.fields)),
      options,
    });

    return new ApiResponse({
      meta,
      data: resultData,
    });
  }

  async one(resourceName, id, options) {
    const { data } = await this.#http.request(RequestBuilder.buildOne(resourceName, id, options));

    if (!data.length) {
      throw new Error(`Resource '${resourceName}' with id '${id}' is not found`);
    }

    const resultData = await this.singleWithInclude({
      resourceName,
      resourceData: Transformers.get(resourceName).fromRaw(data[0], options.fields),
      options,
    });
    return new ApiResponse({ data: resultData });
  }

  async multiple(resourceName, ids, options) {
    const { data: responseData } = await this.#http.request(RequestBuilder.buildMultiple(resourceName, ids, options));
    const data = Object.values(responseData);
    const resultData = await this.multipleWithInclude({
      resourceName,
      resourceData: data.map((item) => Transformers.get(resourceName).fromRaw(item, options.fields)),
      options,
    });
    return new ApiResponse({ data: resultData });
  }

  async create(resourceName, body) {
    const transformer = Transformers.get(resourceName);
    const raw = transformer.toRaw(body);
    const { data } = await this.#http.request(RequestBuilder.buildCreate(resourceName, raw));
    return new ApiResponse({ data: transformer.fromRaw(data) });
  }

  async delete(resourceName, id) {
    const { data } = await this.#http.request(RequestBuilder.buildDelete(resourceName, id));
    return new ApiResponse({ data });
  }

  async update(resourceName, id, body) {
    const transformer = Transformers.get(resourceName);
    const raw = transformer.toRaw(body);
    const { data } = await this.#http.request(RequestBuilder.buildUpdate(resourceName, id, raw));
    return new ApiResponse({ data: transformer.fromRaw(data) });
  }

  async put(resourceName, id, body) {
    const transformer = Transformers.get(resourceName);
    const raw = transformer.toRaw(body);
    const { data } = await this.#http.request(RequestBuilder.buildPut(resourceName, id, raw));
    return new ApiResponse({ data: transformer.fromRaw(data) });
  }

  async register(userData) {
    await this.#http.post('http://market.zetsoft.uz/api/auth/register.aspx', userData);
    console.log(userData);
    return this.login({
      phone: userData.phone,
      password: userData.password,
    });
  }

  async login({ phone, password }) {
    let token;
    fetch(`${MPlaceGateway.#API_HOST}/api/auth/login.aspx?login=${phone}&password=${password}`).then((resp) => resp.json())
      .then((data) => {
        if (data) {
          localStorage.setItem('token', data);
          token = localStorage.getItem('token');
        }
        console.log(token);
      });
    if (token) {
      this.#auth.token = token;
    }
  }

  async logout() {
    this.#auth.deleteToken();
    console.log('LOG OUT');
  }
}

export default MPlaceGateway;
