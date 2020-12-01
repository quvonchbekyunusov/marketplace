<template>
  <!-- start|AzimjonToirov|10/20/2020 -->
  <div class="w-full flex justify-end">
    <router-link
      v-for="link in links"
      :key="link.id"
      :to="link.to"
      class="lg:mr-6 mr-3 last:links"
      active-class="active"
    >
      <i :class="`${link.icon} lg:text-3xl md:text-2xl primary`" />
    </router-link>
  </div>
  <!-- end|AzimjonToirov|10/20/2020 6lines -->
</template>

<script>
/* start|AzimjonToirov|10/20/2020 */
import VueTypes from 'vue-types';

export default {
  name: 'ZNavbarLinks',
  props: {
    links: VueTypes.arrayOf(VueTypes.object).isRequired,
  },
};
/* end|AzimjonToirov|10/20/2020 5lines */
</script>
<style scoped>
  .last\:links:last-child {
    margin-right: 0;
  }

  .active {
    color: #3377FF;
  }
</style>
