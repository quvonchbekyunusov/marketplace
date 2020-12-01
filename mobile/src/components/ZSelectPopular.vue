<template>
  <div>
    <q-select
      v-model="model"
      :options="options"
      label="Сортировка"
      dense
      outlined
      class="select-popular"
      behavior="menu"
      label-color="black"
      @input="$emit('showValue',$event)"
    />
  </div>
</template>

<script>
export default {
  name: 'ZSelectPopular',
  data() {
    return {
      model: null,
      options: [
        'По популярности', 'По рейтингу', 'По возростание цены', 'По убаванию цены', 'Скидки',
      ],
    };
  },
};
</script>

<style lang="scss">
  .select-popular {
    background: #fafafa;

    & .q-field__native {
      span {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

</style>
