export default (VueTypes) => {
  VueTypes.sensibleDefaults = false;

  VueTypes.extend({
    name: 'id',
    getter: true,
    type: VueTypes.oneOfType([VueTypes.string, VueTypes.integer]),
  });

  VueTypes.extend({
    name: 'brand',
    getter: true,
    type: VueTypes.shape({
      id: VueTypes.id,
      name: VueTypes.string,
      logo: VueTypes.string,
    }).loose,
  });

  VueTypes.extend({
    name: 'category',
    getter: true,
    type: VueTypes.shape({
      id: VueTypes.id,
      name: VueTypes.string,
      parent: VueTypes.id,
    }).loose,
  });

  VueTypes.extend({
    name: 'optionType',
    getter: true,
    type: VueTypes.shape({
      id: VueTypes.id,
      name: VueTypes.string,
      options: VueTypes.arrayOf(VueTypes.id),
    }).loose,
  });

  VueTypes.extend({
    name: 'option',
    getter: true,
    type: VueTypes.shape({
      id: VueTypes.id,
      name: VueTypes.string,
      group: VueTypes.id,
    }).loose,
  });

  VueTypes.extend({
    name: 'product',
    getter: true,
    type: VueTypes.shape({
      id: VueTypes.id,
      name: VueTypes.string,
      images: VueTypes.arrayOf(VueTypes.string),
      description: VueTypes.string,
    }).loose,
  });

  VueTypes.extend({
    name: 'seller',
    getter: true,
    type: VueTypes.shape({
      id: VueTypes.id,
      logo: VueTypes.string,
      name: VueTypes.string,
    }).loose,
  });

  VueTypes.extend({
    name: 'catalog',
    getter: true,
    type: VueTypes.shape({
      id: VueTypes.id,
      name: VueTypes.string,
      seller: VueTypes.oneOfType([VueTypes.id, VueTypes.seller]),
      element: VueTypes.oneOfType([VueTypes.id, VueTypes.object]),
    }).loose,
  });
};
