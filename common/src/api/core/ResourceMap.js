import BiMap from 'bidirectional-map';

class ResourceMap {
  #map = new BiMap();

  constructor(mapObject = {}) {
    Object.entries(mapObject).forEach(([normalized, raw]) => {
      this.set(normalized, raw);
    });
  }

  set(normalized, raw) {
    this.#map.set(normalized, raw);
  }

  raw(normalized) {
    return this.#map.get(normalized) || normalized;
  }

  normalized(raw) {
    return this.#map.getKey(raw) || raw;
  }
}

export default ResourceMap;
