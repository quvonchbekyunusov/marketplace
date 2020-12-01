import { mapValues } from 'lodash-es';

class Resource {
  #name = null;

  #attrs = null;

  #relationships = null;

  constructor(name, { attrs = [], relationships = {} } = {}) {
    this.#name = name;
    this.#attrs = attrs;
    this.#relationships = mapValues(relationships, (relResource) => {
      if (Array.isArray(relResource)) {
        return {
          type: 'to-many',
          resource: relResource[0],
        };
      }

      return {
        type: 'to-one',
        resource: relResource,
      };
    });
  }

  get name() {
    return this.#name;
  }

  get attrs() {
    return this.#attrs;
  }

  get relationships() {
    return this.#relationships;
  }

  get fields() {
    return [...this.attrs, ...Object.keys(this.relationships)];
  }

  hasAttr(attr) {
    return this.attrs.includes(attr);
  }

  hasRelationship(relationship) {
    return this.relationships.hasOwnProperty(relationship);
  }

  hasField(field) {
    return this.fields.includes(field);
  }

  getRelationship(relationship) {
    return this.relationships[relationship];
  }
}

export default Resource;
