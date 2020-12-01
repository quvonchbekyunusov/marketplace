<template>
  <!--start: SherzodMangliyev -->
  <div>
    <h5 class="font-bold my-2">
      {{ optionType }}
    </h5>
    <div
      v-for="option in options"
      :key="option.name"
      class="flex flex-row justify-between my-1"
    >
      <span class="text-gray-600">{{ option.name }}</span>
      <span
        class="border-b-2 border-dotted flex-grow m-1"
      />
      <span class="w-1/6 font-medium">{{ option.value }}</span>
    </div>
  </div>
  <!--end: SherzodMangliyev 10 lines HTML 29.10.2020 -->
</template>

<script>
// start: SherzodMangliyev
import VueTypes from 'vue-types';

export default {
  name: 'ZCharacteristic',
  props: {
    options: VueTypes.arrayOf(VueTypes.object),
    optionType: VueTypes.string.isRequired,
  },
};
// end: SherzodMangliyev 6 lines JS 29.10.2020
</script>
