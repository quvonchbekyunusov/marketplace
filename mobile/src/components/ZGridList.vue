<template>
  <div class="flex justify-end q-px-md q-pb-sm">
    <q-btn
      icon="reorder"
      flat
      dense
      size="12px"
      :class="{ 'text-primary': displayType === 'list' }"
      @click="emitDisplayType('list')"
    />
    <q-btn
      icon="border_all"
      flat
      dense
      :class="{ 'text-primary': displayType === 'grid' }"
      size="12px"
      @click="emitDisplayType('grid')"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayType: 'grid',
    };
  },
  methods: {
    emitDisplayType(payload) {
      this.displayType = payload;
      this.$emit('getDisplayType', payload);
    },
  },
};
</script>

<style scoped>
  .filter-button {
    background: #fafafa;
  }
</style>
