<template>
  <q-header class="bg-white toolbar" reveal elevated :reveal-offset="150">
    <q-toolbar class="q-pa-sm">
      <z-back-button />
      <q-toolbar-title class="title text-primary q-pa-none q-ml-sm">
        {{ title }}
      </q-toolbar-title>
      <z-search
        :value="value"
        :class="active ? 'activated bg-white' : 'not-activated'"
        class="search-input"
      />
      <q-btn
        :icon="active ? 'o_close' : 'o_search'"
        class="search-btn"
        text-color="grey"
        color="white"
        rounded
        flat
        dense
        @click="active = !active"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapGetters } from 'vuex';
import ZBackButton from '@/components/ZBackButton';
import ZSearch from '@/components/ZSearch';

export default {
  name: 'ZToolbar',
  components: {
    ZBackButton,
    ZSearch,
  },
  data() {
    return {
      active: false,
      value: '',
    };
  },
  computed: mapGetters({ title: 'toolbar/title' }),
};
</script>

<style scoped>
  .toolbar {

  }

  .title {
    font-size: 18px;
  }

  .search-input {
    border-radius: 5px;
    transition: 0.4s;
  }

  .activated {
    width: 100%;
  }

  .not-activated {
    width: 0%;
  }
</style>
