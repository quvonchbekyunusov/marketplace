<template>
  <ul class="row q-col-gutter-x-sm q-col-gutter-y-md">
    <li v-for="navItem in navItems" :key="navItem.label" class="col-4 text-center">
      <router-link
        :to="{ name: navItem.url }"
        class="column justify-center items-center text-no-decoration text-grey-7"
      >
        <q-icon :name="navItem.icon" color="primary" size="md" />
        <span class="q-mt-sm">{{ navItem.label }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ZHomeNav',
  constants: {
    navItems: [
      { label: 'Бренды', icon: 'fal fa-burn', url: 'brands' },
      { label: 'Магазины', icon: 'fal fa-store', url: 'sellers' },
      { label: 'Категории', icon: 'fal fa-stream', url: 'categories' },
    ],
  },
};
</script>
