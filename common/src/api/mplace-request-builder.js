import { BaseValues, ResourceMap, Transformers } from './resources';

const PREFIX_MAP = new Map([
  ['ne', '!='],
  ['lt', '<'],
  ['gt', '>'],
  ['lte', '<='],
  ['gte', '>='],
  ['like', 'like'],
]);

function transformFilterValue(filterValue) {
  if (Array.isArray(filterValue)) {
    return filterValue.map(transformFilterValue);
  }

  if (typeof filterValue !== 'string') {
    return filterValue;
  }

  if (!filterValue.includes(':')) {
    return filterValue;
  }

  const prefix = filterValue.slice(0, filterValue.indexOf(':'));

  if (!PREFIX_MAP.get(prefix)) {
    return filterValue;
  }

  return `${PREFIX_MAP.get(prefix)}${filterValue.slice(filterValue.indexOf(':') + 1)}`;
}

function buildQuery(resource, { filter = {} /* include */, sort = [], page = null, fields = [] }) {
  filter = { ...BaseValues.get(resource), ...filter };

  const resourceTransformer = Transformers.get(resource);

  if (!fields.includes('id')) {
    fields.push('id');
  }

  const transformedFields = fields.map((field) => resourceTransformer.getFieldNormalizer(field).rawField);

  // const transformedInclude = [...include.map((field) => resourceTransformer.getFieldNormalizer(field).rawField)];

  const transformedFilter = Object.entries(filter)
    .reduce((result, [field, value]) => {
      const fieldNormalizer = resourceTransformer.getFieldNormalizer(field);
      const transformedFilterValue = transformFilterValue(value);
      const rawFilter = Array.isArray(transformedFilterValue)
        ? transformedFilterValue.map(fieldNormalizer.toRaw.bind(fieldNormalizer))
        : fieldNormalizer.toRaw(transformedFilterValue);

      return ({
        ...result,
        [fieldNormalizer.rawField]: rawFilter,
      });
    }, {});

  const transformedSort = sort.map((sorter) => {
    const entries = Object.entries(sorter);

    if (entries.length !== 1) {
      throw new Error('Sorter object must have only 1 key - value pair');
    }

    const [field, order] = entries[0];
    const fieldNormalizer = resourceTransformer.getFieldNormalizer(field);
    return order === 'desc' ? `-${fieldNormalizer.rawField}` : fieldNormalizer.rawField;
  });

  const transformedPage = {
    page: page?.number,
    'per-page': page?.size,
  };

  return {
    ...(Object.entries(filter || {})?.length > 0 && { query: transformedFilter }),
    // ...(include?.length > 0 && { with: transformedInclude }),
    ...(sort?.length > 0 && { sort: transformedSort }),
    ...(fields?.length && { select: transformedFields }),
    ...(page && transformedPage),
  };
}

export function buildAll(resource, { filter, include, sort, page, fields }) {
  return {
    method: 'GET',
    url: `/${ResourceMap.raw(resource)}/index.aspx`,
    params: buildQuery(resource, { filter, include, sort, page, fields }),
  };
}

export function buildOne(resource, id, { include, fields }) {
  return buildAll(resource, { include, fields, filter: { id } });
}

export function buildMultiple(resource, ids, { include, fields }) {
  return buildAll(resource, { include, fields, filter: { id: ids } });
}

export function buildCreate(resource, body) {
  body = { ...body, ...BaseValues.get(resource) };

  return {
    method: 'POST',
    url: `/${ResourceMap.raw(resource)}/create.aspx`,
    data: body,
  };
}

export function buildDelete(resource, id) {
  return {
    method: 'DELETE',
    url: `/${ResourceMap.raw(resource)}/delete.aspx`,
    params: { id },
  };
}

export function buildUpdate(resource, id, body) {
  body = { ...body, ...BaseValues.get(resource) };

  return {
    method: 'PATCH',
    url: `${ResourceMap.raw(resource)}/update.aspx`,
    params: { id },
    data: body,
  };
}

export function buildPut(resource, id, body) {
  body = { ...body, ...BaseValues.get(resource) };

  return {
    method: 'PUT',
    url: `${ResourceMap.raw(resource)}/update.aspx`,
    params: { id },
    data: body,
  };
}
