<template>
  <ul :class="listClasses">
    <li v-for="item in items" :key="identify(item)" :class="gapClasses">
      <slot name="item" :value="item">
        <span>{{ item }}</span>
      </slot>
    </li>
  </ul>
</template>

<script>
import VueTypes from 'vue-types';

const get = (object, path) => path.split('.').reduce((value, field) => value[field], object);

export default {
  name: 'UiList',

  props: {
    identifier: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.arrayOf(VueTypes.string),
      VueTypes.func,
    ]).def('id'),
    items: VueTypes.array.isRequired,
    gap: VueTypes.number.def(0),
    vertical: VueTypes.bool.def(false),
  },

  computed: {
    listClasses() {
      if (this.vertical) {
        return ['flex', 'flex-col'];
      }

      return ['flex', 'items-center'];
    },

    gapClasses() {
      if (this.vertical) {
        return [`mb-${this.gap}`, 'last:mb-0'];
      }

      return [`mr-${this.gap}`, 'last:mr-0'];
    },
  },

  methods: {
    identify(value) {
      return this.baseIdentify(value, this.identifier);
    },

    baseIdentify(value, identifier) {
      if (typeof identifier === 'string') {
        return this.baseIdentify(value, get.bind(null, value, identifier));
      }

      if (Array.isArray(identifier)) {
        return this.baseIdentify(value, (_value) => identifier.map(get.bind(null, _value)).join('|'));
      }

      return identifier(value);
    },
  },
};
</script>
