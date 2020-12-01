<template>
  <q-page class="flex items-center justify-center">
    <z-empty-state
      :content="{
        title: 'В разработке...',
        icon: 'fas fa-tools',
        body: 'Эта страница находится в разработке',
      }"
      :btn="{
        label: 'Домой',
        color: 'primary',
        to: {
          name: 'home'
        }
      }"
    />
  </q-page>
</template>

<script>
import ZEmptyState from '@/components/ZEmptyState';

export default {
  name: 'InDevelopmentPage',
  components: {
    ZEmptyState,
  },
  data() {
    return {};
  },
};
</script>
