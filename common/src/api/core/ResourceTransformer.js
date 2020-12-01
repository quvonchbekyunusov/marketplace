class ResourceTransformer {
  #resource = null;

  #fieldNormalizers = new Map();

  constructor(resource, fieldTransformers = {}) {
    this.#resource = resource;

    Object.entries(fieldTransformers).forEach(([field, transformer]) => {
      this.setFieldNormalizer(field, transformer);
    });
  }

  setFieldNormalizer(field, normalizer) {
    if (typeof normalizer === 'string') {
      this.setFieldNormalizer(field, { rawField: normalizer });
      return;
    }

    if (!normalizer.rawField) {
      normalizer.rawField = field;
    }

    if (!normalizer.fromRaw) {
      normalizer.fromRaw = (rawFieldValue) => rawFieldValue;
    }

    if (!normalizer.toRaw) {
      normalizer.toRaw = (value) => value;
    }

    this.#fieldNormalizers.set(field, normalizer);
  }

  getFieldNormalizer(field) {
    return this.#fieldNormalizers.get(field) || {
      rawField: field,
      fromRaw: (rawFieldValue) => rawFieldValue,
      toRaw: (value) => value,
    };
  }

  fromRaw(rawResource, fields = null) {
    if (!fields) {
      fields = this.#resource.fields;
    }

    return Object.fromEntries(
      this.#resource.fields
        .filter((field) => fields.includes(field))
        .map((field) => {
          const fieldNormalizer = this.getFieldNormalizer(field);
          return [
            field, fieldNormalizer.fromRaw(rawResource[fieldNormalizer.rawField], rawResource),
          ];
        }),
    );
  }

  toRaw(resource) {
    return this.#resource.fields
      .filter(resource.hasOwnProperty.bind(resource))
      .reduce((result, field) => ({ result, ...this.getFieldNormalizer(field).toRaw(resource[field]) }), {});
  }
}

export default ResourceTransformer;
