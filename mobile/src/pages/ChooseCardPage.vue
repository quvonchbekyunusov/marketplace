<template>
  <q-page class="withing">
    <q-input
      v-model="card"
      bg-color="silver"
      fill-mask="X"
      filled
      label="Card"
      mask="#### #### #### ####"
    />
    <div class="q-pa-md">
      <div class="q-gutter-md row">
        <q-select
          v-model="model"
          filled
          label="Simple select"
          :options="stringOptions"
          style="width: 250px"
          behavior="menu"
        />

        <q-select
          v-model="model"
          filled
          use-input
          input-debounce="0"
          label="Simple filter"
          :options="options"
          style="width: 250px"
          behavior="menu"
          @filter="filterFn"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'ChooseCardPage',
};

</script>

<style scoped>
    .withing{
    width: 80%;
    margin: 0 auto;
    }
</style>
