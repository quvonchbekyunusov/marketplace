<template>
  <q-list separator class="z-profile-categories">
    <q-item
      v-for="item in data"
      :key="item.id"
      v-ripple
      :to="item.link"
      clickable
      active-class="text-black"
      class="q-pa-sm"
      @click="controlEvent(item)"
    >
      <q-item-section>{{ item.label }}</q-item-section>
      <q-item-section avatar class="text-grey-6">
        <q-icon v-if="item.type !== 'toggle' " name="keyboard_arrow_right" />
      </q-item-section>
      <q-toggle
        v-if="item.type==='toggle'"
        v-model="value"
        color="green"
        @input="$emit('toggleEvent', value)"
      />
    </q-item>
  </q-list>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ProfileCategories',
  props: {
    data: VueTypes.arrayOf(VueTypes.shape({
      id: VueTypes.id.isRequired,
      link: VueTypes.string.isRequired,
      icon: VueTypes.string.isRequired,
      label: VueTypes.string.isRequired,
      type: VueTypes.string.def('basic'),
    }).isRequired),
  },
  data() {
    return {
      value: true,
    };
  },
  methods: {
    controlEvent(payload) {
      if (payload.type === 'dialog') {
        this.$devDialog.show();
      } else if (payload.type === 'toggle') {
        this.value = !this.value;
      } else {
        console.log('on process');
      }
    },
  },
};
</script>

<style scoped>
  .z-profile-categories {
    border-bottom: 1px solid #dfdfdf;
  }
</style>
