<template>
  <q-table
    :data="data"
    row-key="name"
    :separator="separator"
    hide-bottom
    hide-header
    dense
    flat
    bordered
  />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZCharasteristicsTable',
  props: {
    data: VueTypes.arrayOf(VueTypes.shape({
      option: VueTypes.string.isRequired,
      value: VueTypes.string.isRequired,
    }).isRequired).isRequired,
  },
  data() {
    return {
      separator: 'vertical',
      // data: [
      //   {
      //     option: 'Цвет:',
      //     value: 'Black',
      //   },
      //   {
      //     option: 'RAM',
      //     value: 8,
      //   },
      // ],
    };
  }
  ,
};
</script>
