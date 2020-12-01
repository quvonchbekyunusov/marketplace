const idGenerator = {
  id: 1,

  generate() {
    const result = this.id;

    this.id++;

    return `id-${result.toString()}`;
  },

  reset() {
    this.id = 1;
  },
};

export default class {
  usedIds = new Set();

  fetch() {
    let newId = idGenerator.generate();
    while (this.usedIds.has(newId)) {
      newId = idGenerator.generate();
    }

    this.usedIds.add(newId);

    return newId;
  }

  set(id) {
    if (this.usedIds.has(id)) {
      throw new Error(`ID ${id} has already been used.`);
    }

    this.usedIds.add(id);
  }

  reset() {
    idGenerator.reset();
    this.usedIds.clear();
  }
}
