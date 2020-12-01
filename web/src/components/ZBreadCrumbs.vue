<template>
  <div class="breadcrumb">
    <ul class="flex items-center ">
      <li v-for="({ id, label, to }, index) in links" :key="id" class="flex items-center link p-2 ">
        <router-link v-if="!(links.length-1 == index)" :to="to">
          {{ label }}
        </router-link>
        <span v-else>
          {{ label }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    links: VueTypes.arrayOf(
      VueTypes.shape({
        id: VueTypes.any.isRequired,
        label: VueTypes.string.isRequired,
        to: VueTypes.route,
      }),
    ).isRequired,
  },
  methods: {
  },
};
</script>

<style scoped>
  .link:not(:last-child)::after {
    content: '>';
    @apply mx-2;
  }
  .link:last-child {
    color: #3377FF;
    font-weight: bold;
  }
</style>
