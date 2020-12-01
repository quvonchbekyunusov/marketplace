<template>
  <!--start: Makhmudov Mirfozil-->
  <div>
    <div v-if="type === 'circle'" class="flex justify-center items-center w-20">
      <button
        class="w-5 h-5 focus:outline-none flex justify-center items-center border border-black rounded-xl"
        @click="decrease"
      >
        <ui-icon name="minus" class="text-xs font-semibold text-gray-600" />
      </button>
      <input class="w-8 outline-none text-center" disabled :value="value" type="text">
      <button
        class="w-5 h-5 focus:outline-none flex justify-center items-center border border-black rounded-xl"
        @click="increase"
      >
        <ui-icon name="plus" class="text-xs font-semibold text-gray-600" />
      </button>
    </div>
    <div
      v-if="type === 'default'"
      class="flex justify-center items-center border border-black w-20 rounded"
    >
      <button class="w-5 h-5 focus:outline-none flex justify-center items-center" @click="decrease">
        <ui-icon name="minus" class="text-xs font-semibold text-gray-600" />
      </button>
      <input class="w-8 outline-none text-center" disabled :value="value" type="text">
      <button class="w-5 h-5 focus:outline-none flex justify-center items-center" @click="increase">
        <ui-icon name="plus" class="text-xs font-semibold text-gray-600" />
      </button>
    </div>
  </div>
  <!--end: Makhmudov Mirfozil-->
</template>

<script>
// start: Mirfozil Makhmudov
import VueTypes from 'vue-types';
import UiIcon from '@/components/ui/UiIcon';

export default {
  name: 'ZInputNumber',
  components: {
    UiIcon,
  },
  props: {
    type: VueTypes.string.def('default'),
    value: VueTypes.number.isRequired,
    min: VueTypes.number.def(Number.NEGATIVE_INFINITY),
    max: VueTypes.number.def(Number.POSITIVE_INFINITY),
    step: VueTypes.number.def(1),
  },
  methods: {
    increase() {
      if (this.value < this.max) {
        this.value += this.step;
      }
    },
    decrease() {
      if (this.value > this.min) {
        this.value -= this.step;
      }
    },
  },
};
// end: Mirfozil Makhmudov
</script>
