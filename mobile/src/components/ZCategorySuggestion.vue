<template>
  <q-card
    class="my-card row"
    flat-bordered
    :class="hasId(categoryId) ? 'primary text-primary' : 'text-grey-8'"
    @click="setCategory(categoryId, !hasId(categoryId))"
  >
    <q-card-section class="q-pa-none col-5">
      <q-icon :name="categoryIcon" class="fit" size="md" />
    </q-card-section>
    <q-card-section class="q-pa-none col-7 flex items-center q-px-xs">
      <p class="product-name text-center ellipsis-2-lines">
        {{ categoryName }}
      </p>
    </q-card-section>
  </q-card>
</template>

<script>
import VueTypes from 'vue-types';
import { mapGetters } from 'vuex';

export default {
  name: 'CategoryCard',
  props: {
    categoryId: VueTypes.string.isRequired,
    categoryIcon: VueTypes.string.isRequired,
    categoryName: VueTypes.string.isRequired,
  },
  data() {
    return {
      toggleCategory: false,
    };
  },
  computed: {
    ...mapGetters({
      selectedCategory: 'filters/category',
      hasId: 'filters/hasItem',
    }),
  },
  methods: {
    // start Axrorbek Nisonboyev
    setCategory(id, hasItem) {
      if (hasItem) {
        this.$store.dispatch('filters/clearCategory');
        this.$store.dispatch('filters/setCategory', id);
        this.hasId = true;
      } else {
        this.$store.dispatch('filters/removeCategory', id);
        this.hasId = false;
      }
    },
    // end Axrorbek Nisonboyev
  },
};
</script>

<style scoped lang="scss">
  .my-card {
    border: solid transparent;
  }

  .product-name {
    font-size: 12px;
  }

  .border-primary {
    border: solid $primary;
  }
</style>
