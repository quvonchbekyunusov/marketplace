<template>
  <div>
    <q-card class="my-card">
      <q-card-section class="bg-green">
        <q-icon name="home" color="white" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'ZCheckCard',
  props: {},
  data() {
    return {
      shape: ['line'],
    };
  },
};
</script>

<style lang="scss" scoped>
  .my-card {
    max-width: 250px;
    max-height: 250px;
  }
</style>
