<template>
  <q-card class="full-width">
    <router-link :to="{ name: 'category', params: { id: category.id } }">
      <q-card-section class="column justify-center items-center text-center">
        <q-img v-if="category.image" :src="category.image" :ratio="1" contain />
        <q-icon v-else :name="category.icon" size="lg" color="primary" class="q-mb-sm" />
        <v-clamp tag="p" class="text-caption word-break-hyphens full-width" :max-lines="2">
          {{ category.name }}
        </v-clamp>
      </q-card-section>
    </router-link>
  </q-card>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZPopularCategoryCard',
  props: {
    category: VueTypes.category.isRequired,
  },
};
</script>
