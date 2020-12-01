import categories from '@/mirage/data/categories.yaml';
import brands from '@/mirage/data/brands.yaml';
import optionGroups from '@/mirage/data/option-groups.yaml';

export default {
  categories(server) {
    categories.forEach((category) => {
      createCategory({ ...category, level: 1 });
    });

    function createCategory({ name, subcategories, level }) {
      const attrs = { name, level };

      if (subcategories) {
        attrs.subcategories = subcategories.map((subcategory) => createCategory({
          ...subcategory,
          level: level + 1,
        }));
      }

      return server.create('category', attrs);
    }
  },

  brands(server) {
    brands.forEach(createBrand);

    function createBrand(attrs) {
      return server.create('brand', attrs);
    }
  },

  optionGroups(server) {
    optionGroups.forEach(createOptionType);

    function createOptionType({ name, options }) {
      return server.create('option-type', { name, options: options.map(createOption) });
    }

    function createOption(attrs) {
      return server.create('option', attrs);
    }
  },
};
