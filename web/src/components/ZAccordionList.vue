<template>
  <div>
    <z-accordion
      v-for="contentBody in content"
      :id="contentBody.id"
      :key="contentBody.id"
      :label="contentBody.name"
      :content="contentBody.items"
    >
      <template v-slot:label>
        <slot name="label"  />
      </template>
      <template v-slot:content>
        <slot name="content" />
      </template>
    </z-accordion>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import ZAccordion from './ZAccordion';

export default {
  name: 'ZAccordionList',
  components: { ZAccordion },
  props: {
    content: VueTypes.array,
  },
};
</script>

<style scoped>

</style>
