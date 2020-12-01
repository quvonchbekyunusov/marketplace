<template>
  <q-input
    v-model="text"
    label="Поиск"
    class="order-search q-px-md q-py-xs"
    dense
    borderless
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'ZOrderSearch',
};
</script>

<style scoped>
  .order-search {
    background: #fafafa;
    width: 90%;
    margin: auto;
    border-radius: 5px;
  }
</style>
