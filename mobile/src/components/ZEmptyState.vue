<template>
  <div class="column flex-center">
    <div v-if="content.icon">
      <q-icon :name="content.icon" class="icon" size="96px" color="grey-7" />
    </div>
    <q-img v-if="content.image" :src="content.image" :ratio="content.ratio" contain />
    <div class="title q-mx-auto q-mt-lg text-caption">
      {{ content.title }}
    </div>
    <div v-if="content.body" class="body text-caption q-mx-auto q-mt-md">
      {{ content.body }}
    </div>
    <div class="flex justify-center q-mt-xl">
      <q-btn v-if="btn.label !== ''" :label="btn.label" :color="btn.color" :text-color="btn.textColor" :to="btn.to" />
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'ZEmptyState',
  props: {
    content: VueTypes.shape({
      icon: VueTypes.string.def(''),
      image: VueTypes.string.def(''),
      ratio: VueTypes.number.def(''),
      title: VueTypes.string.isRequired,
      body: VueTypes.string.def(''),
    }),
    btn: VueTypes.shape({
      label: VueTypes.string.def(''),
      color: VueTypes.string.def(''),
      textColor: VueTypes.string.def(''),
      to: VueTypes.any.isRequired,
    }),
  },
  watch: {
    btn: {
      immediate: true,
      handler() {
      },
    },
  },
};
</script>
<style scoped>
  .body {
    font-weight: 500;
    font-size: 18px;
    line-height: 1.16;
    color: #575757;
    text-align: center;
  }

  .title {
    font-weight: 500;
    font-size: 26px;
    line-height: 1.16;
    text-align: center;
    color: #575757;
  }
</style>
