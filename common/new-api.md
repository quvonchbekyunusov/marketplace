# Queries


## Filter

- Value type:: Object\
  Example: filter: { id: '123' }

## Include

- Value type:: Array\
  Example: include: ['brand', 'seller']

## Sort

- Value type:: Array of objects\
  Objects consist of one key-value pair
  where key is a resource's field by which the results will be sorted
  value is sorting order ('asc', 'desc') \
  example:\
  sort: [\
   { id: 'asc'} \
   { rating: 'desc'} \
   ]

## Page(Pagination)

- Value type :: Object\
  example\
  page: {\
    number: 12,\
    size: 1,\
  }
