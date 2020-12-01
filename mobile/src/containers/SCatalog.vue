<template>
  <q-inner-loading v-if="isLoading" :showing="isLoading" color="primary" size="md" />
  <z-catalog v-else :grand-categories="grandCategories" :fetch-category="fetchSubcategories" />
</template>

<script>
import { filter } from 'lodash-es';
import api from '@common/api';
import ZCatalog from '@/components/ZCatalog';

export default {
  name: 'SCatalog',
  components: {
    ZCatalog,
  },
  data() {
    return {
      isLoading: true,
      categories: null,
      grandCategories: null,
    };
  },
  async created() {
    this.categories = (await api.all('category')).data;
    this.grandCategories = filter(this.categories, ['parent', null]);
    this.isLoading = false;
  },
  methods: {
    async fetchSubcategories(id) {
      const subcategories = await Promise.all(
        filter(this.categories, ['parent', id])
          .map(async (category) => ({
            ...category,
            subcategories: await this.fetchSubcategories(category.id),
          })),
      );

      return Promise.resolve(subcategories);
    },
  },
};
</script>
