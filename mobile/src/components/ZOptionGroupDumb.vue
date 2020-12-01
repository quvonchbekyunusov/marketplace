<template>
  <q-btn-toggle :value="value" :options="optionGroup.options" />
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZOptionGroupDumb',
  props: {
    value: VueTypes.oneOfType([null, VueTypes.id]).def(null),
    optionGroup: VueTypes.optionType.isRequired,
  },
};
</script>
