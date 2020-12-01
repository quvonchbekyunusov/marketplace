<template>
  <q-header
    class="row header items-center bg-white q-pt-md q-pb-sm q-px-md q-pb-xs"
    reveal
    :reveal-offset="100"
  >
    <q-form class=" col-grow" @submit="onSearch">
      <div class="input_search bg-white q-mt-none">
        <z-search
          v-model="searchQuery"
          :value="searchQuery"
          class="full-width input"
        >
          <template v-slot:prepend>
            <q-icon
              name="o_search"
              size="sm"
              color="grey"
              class="q-ml-sm  "
            />
          </template>
          <template v-slot:append>
            <q-btn
              text-color="primary"
              padding="0"
              icon="mic"
              flat
              size="md"
              round
              color="grey"
              @click="$devDialog.show()"
            />
            <q-btn
              text-color="primary"
              padding="0"
              class="q-mr-sm"
              icon="o_camera_alt"
              flat
              size="md"
              round
              color="grey"
              @click="$devDialog.show()"
            />
          </template>
        </z-search>
      </div>
    </q-form>
  </q-header>
</template>

<script>
import ZSearch from '@/components/ZSearch';

export default {
  name: 'ZHeader',
  components: {
    ZSearch,
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    onSearch() {
      this.$router.push({ name: 'search', query: { q: this.searchQuery } });
    },
  },
};
</script>
<style scoped lang="scss">
  .header {
    border-bottom: 1px solid #dfdfdf;
  }

  .input_search {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 5px !important;
  }
</style>
